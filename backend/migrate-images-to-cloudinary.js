import mongoose from 'mongoose';
import cloudinary from './config/cloudinary.js';
import foodModel from './models/foodModel.js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const migrateImagesToCloudinary = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in .env file');
    }
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    // Get all food items
    const foods = await foodModel.find({});
    console.log(`\nFound ${foods.length} food items to check`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const food of foods) {
      // Check if image is already a Cloudinary URL
      if (food.image.startsWith('http')) {
        console.log(`⊘ Skipping "${food.name}" - already using Cloudinary`);
        skipped++;
        continue;
      }

      try {
        // Path to local image file
        const imagePath = path.join(process.cwd(), 'uploads', food.image);

        // Check if file exists
        if (!fs.existsSync(imagePath)) {
          console.log(`✗ File not found for "${food.name}": ${food.image}`);
          failed++;
          continue;
        }

        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
        const b64 = imageBuffer.toString('base64');
        const dataURI = `data:image/jpeg;base64,${b64}`;

        // Upload to Cloudinary
        console.log(`↑ Uploading "${food.name}"...`);
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'food-delivery',
          resource_type: 'auto',
          public_id: food.image.split('.')[0], // Use original filename as public_id
        });

        // Update database with new URL
        food.image = result.secure_url;
        await food.save();

        console.log(`✓ Migrated "${food.name}" to Cloudinary`);
        migrated++;
      } catch (error) {
        console.error(`✗ Error migrating "${food.name}":`, error.message);
        failed++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('MIGRATION COMPLETE');
    console.log('='.repeat(50));
    console.log(`✓ Successfully migrated: ${migrated}`);
    console.log(`⊘ Skipped (already migrated): ${skipped}`);
    console.log(`✗ Failed: ${failed}`);
    console.log('='.repeat(50));

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
};

// Run the migration
migrateImagesToCloudinary();
