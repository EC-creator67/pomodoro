import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID not found' });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findOneAndUpdate({ _id: userId }, { $set: { cartData } });
    res.json({ success: true, message: 'item aggiunto al carrello' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID not found' });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findOneAndUpdate({ _id: userId }, { $set: { cartData } });
    res.json({ success: true, message: 'item rimosso dal carrello' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID not found' });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching cart data' });
  }
};

export { addToCart, removeFromCart, getCart };
