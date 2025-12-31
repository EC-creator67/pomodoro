import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // Ensure cartItems is always an object to prevent errors
  const safeCartItems = cartItems || {};

  return (
    <div>
      <div className="relative">
        <img
          className="rounded-[15px] w-70 h-70 fade-in"
          src={image.startsWith('http') ? image : url + '/images/' + image}
          alt=""
        />
        {!safeCartItems[id] ? (
          <img
            className="absolute w-[35px] -mt-12 ml-60 cursor-pointer rounded"
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="absolute flex w-[30px] ml-44 -mt-12 items-center gap-2 rounded-md ">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p className="text-center text-orange-700 bg-white px-2 rounded-md">
              {safeCartItems[id]}
            </p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="relative">
        <div>
          <p className="text-gray-700 font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
        <p>$ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
