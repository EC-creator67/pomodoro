import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodControllers.js';
import multer from 'multer';

const foodRouter = express.Router();

// Use memory storage for Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
