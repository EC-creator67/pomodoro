import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import foodModel from './models/foodModel.js';

// Array di prodotti con estensione .jpg
const products = [
  {
    name: 'Maccheroni pasta',
    image: 'food_1.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pasta',
  },
  {
    name: 'Maccheroni al pomodoro',
    image: 'food_2.jpg',
    price: 18,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pasta',
  },
  {
    name: 'Dolce Torre',
    image: 'food_3.jpg',
    price: 16,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Desserts',
  },
  {
    name: 'Agnello e Veg',
    image: 'food_4.jpg',
    price: 24,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Rolls',
  },
  {
    name: 'Eggs Sandwich',
    image: 'food_5.jpg',
    price: 14,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Sandwich',
  },
  {
    name: 'Peri Peri Rolls',
    image: 'food_6.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Rolls',
  },
  {
    name: 'Straccetti',
    image: 'food_7.jpg',
    price: 20,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Salad',
  },
  {
    name: 'Incanto',
    image: 'food_8.jpg',
    price: 15,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Salad',
  },
  {
    name: 'Deliziosi Tocchi',
    image: 'food_9.jpg',
    price: 14,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Desserts',
  },
  {
    name: 'Veg Cheese',
    image: 'food_10.jpg',
    price: 22,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
  {
    name: 'Egg Salad',
    image: 'food_11.jpg',
    price: 10,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Salad',
  },
  {
    name: 'Spaghetti Delizia',
    image: 'food_12.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Spaghetti Chicken',
    image: 'food_13.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Fruits & Fruits',
    image: 'food_14.jpg',
    price: 18,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Desserts',
  },
  {
    name: 'Party Fruits',
    image: 'food_15.jpg',
    price: 16,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Desserts',
  },
  {
    name: 'Bread Sandwich',
    image: 'food_16.jpg',
    price: 24,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Sandwich',
  },
  {
    name: 'Deliciuos Pasta',
    image: 'food_17.jpg',
    price: 14,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pasta',
  },
  {
    name: 'Just eat',
    image: 'food_18.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Rolls',
  },
  {
    name: 'Cacciatora Noodles',
    image: 'food_19.jpg',
    price: 20,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Pasta Bolognese',
    image: 'food_20.jpg',
    price: 15,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pasta',
  },
  {
    name: 'Garlic Mushroom',
    image: 'food_21.jpg',
    price: 14,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
  {
    name: 'Fried Cauliflower',
    image: 'food_22.jpg',
    price: 22,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
  {
    name: 'Mix Veg Pulao',
    image: 'food_23.jpg',
    price: 10,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
  {
    name: 'Rice Zucchini',
    image: 'food_24.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
  {
    name: 'Funny Fruits',
    image: 'food_25.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Desserts',
  },
  {
    name: 'Double Crispy Burger',
    image: 'food_26.jpg',
    price: 18,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Sandwich',
  },
  {
    name: 'Cheese Burger',
    image: 'food_27.jpg',
    price: 16,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Sandwich',
  },
  {
    name: 'Yummy',
    image: 'food_28.jpg',
    price: 24,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Rolls',
  },
  {
    name: 'Buttter Noodles',
    image: 'food_29.jpg',
    price: 14,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Veg Noodles',
    image: 'food_30.jpg',
    price: 12,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Somen Noodles',
    image: 'food_31.jpg',
    price: 20,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Noodles',
  },
  {
    name: 'Cooked Cheese',
    image: 'food_32.jpg',
    price: 15,
    description: 'Cibo che fornisce essenziali nutrienti per la nostra salute e benessere.',
    category: 'Pure Veg',
  },
];

const seedDB = async () => {
  try {
    // Usa connectDB per collegarti tramite la logica già configurata nel progetto
    await connectDB();
    console.log('Connesso a MongoDB per il reseeding...');

    // 1. Cancella i vecchi documenti con le estensioni errate (.png)
    await foodModel.deleteMany({});
    console.log('Vecchia lista cancellata con successo.');

    // 2. Inserisce la nuova lista aggiornata con i file .jpg
    await foodModel.insertMany(products);
    console.log('✅ Nuova lista di prodotti inserita con successo!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Errore durante il seeding:', error);
    process.exit(1);
  }
};

// Esecuzione dello script
seedDB();