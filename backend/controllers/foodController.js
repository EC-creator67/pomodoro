import foodModel from '../models/foodModel.js';
import cloudinary from '../config/cloudinary.js';

// add food item

const addFood = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'food-delivery',
      resource_type: 'auto',
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url,
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

// get all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Extract public_id from Cloudinary URL if it exists
    if (food.image && food.image.includes('cloudinary')) {
      const urlParts = food.image.split('/');
      const publicIdWithExt = urlParts[urlParts.length - 1];
      const publicId = `food-delivery/${publicIdWithExt.split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

export { addFood, listFood, removeFood };
