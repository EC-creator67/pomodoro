import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://EC_Web:ecweb123@pomodoro.xbvgp1g.mongodb.net/Pomodoro')
    .then(() => console.log('Connesso al DB'));
}