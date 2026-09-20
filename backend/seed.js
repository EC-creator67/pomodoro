import 'dotenv/config';
import { connectDB } from './config/db.js';
import foodModel from './models/foodModel.js';

const seedProducts = async () => {
  try {
    // 1. Connessione a MongoDB Atlas
    await connectDB();

    // 2. Definizione dei prodotti
    const products = [
     {
            
             name: "Maccheroni pasta",
             image: "food_1.jpg",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pasta"
         },
         {
            
             name: "Maccheroni al pomodoro",
             image: "food_2.jpg",
             price: 18,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pasta"
         }, {
            
             name: "Dolce Torre",
             image: "food_3.png",
             price: 16,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Desserts"
         }, {
            
             name: "Agnello e Veg",
             image: "food_4.png",
             price: 24,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Rolls"
         }, {
            
             name: "Eggs Sandwich",
             image: "food_5.png",
             price: 14,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Sandwich"
         }, {
            
             name: "Peri Peri Rolls",
             image: "food_6.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Rolls"
         }, {
            
             name: "Straccetti",
             image: "food_7.png",
             price: 20,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Salad"
         }, {
            
             name: "Incanto",
             image: "food_8.png",
             price: 15,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Salad"
         }, {
            
             name: "Deliziosi Tocchi",
             image: "food_9.png",
             price: 14,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Desserts"
         }, {
            
             name: "Veg Cheese",
             image: "food_10.png",
             price: 22,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         }, {
            
             name: "Egg Salad",
             image: "food_11.png",
             price: 10,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Salad"
         }, {
            
             name: "Spaghetti Delizia",
             image: "food_12.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         },
         {
            
             name: "Spaghetti Chicken",
             image: "food_13.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         },
         {
            
             name: "Fruits & Fruits",
             image: "food_14.png",
             price: 18,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Desserts"
         }, {
            
             name: "Party Fruits",
             image: "food_15.png",
             price: 16,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Desserts"
         }, {
            
             name: "Bread Sandwich",
             image: "food_16.png",
             price: 24,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Sandwich"
         }, {
            
             name: "Deliciuos Pasta",
             image: "food_17.png",
             price: 14,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pasta"
         }, {
            
             name: "Just eat",
             image: "food_18.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Rolls"
         }, {
            
             name: "Cacciatora Noodles",
             image: "food_19.png",
             price: 20,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         }, {
            
             name: "Pasta Bolognese",
             image: "food_20.png",
             price: 15,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pasta"
         }, {
            
             name: "Garlic Mushroom ",
             image: "food_21.png",
             price: 14,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         }, {
            
             name: "Fried Cauliflower",
             image: "food_22.png",
             price: 22,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         }, {
            
             name: "Mix Veg Pulao",
             image: "food_23.png",
             price: 10,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         }, {
            
             name: "Rice Zucchini",
             image: "food_24.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         },
         {
        
             name: "Funny Fruits",
             image: "food_25.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Desserts"
         },
         {
             
             name: "Double Crispy Burger",
             image: "food_26.png",
             price: 18,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Sandwich"
         }, {
             
             name: "Cheese Burger",
             image: "food_27.png",
             price: 16,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Sandwich"
         }, {
             
             name: "Yummy",
             image: "food_28.png",
             price: 24,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Rolls"
         }, {
             
             name: "Buttter Noodles",
             image: "food_29.png",
             price: 14,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         }, {
             
             name: "Veg Noodles",
             image: "food_30.png",
             price: 12,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         }, {
             
             name: "Somen Noodles",
             image: "food_31.png",
             price: 20,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Noodles"
         }, {
             
             name: "Cooked Cheese",
             image: "food_32.jpg",
             price: 15,
             description: " Cibo che fornisce essenziali nutrienti per la nostra salute e benessere. ",
             category: "Pure Veg"
         },
    ];

    // 3. Inserimento nel Database
    await foodModel.insertMany(products);
    console.log("✅ Prodotti inseriti con successo su MongoDB Atlas!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Errore durante il seeding:", error);
    process.exit(1);
  }
};

seedProducts();