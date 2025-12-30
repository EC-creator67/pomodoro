import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="mt-15 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="grid grid-cols-6 items-center gap-4 bg-gray-100 px-4 py-3 font-medium rounded-t-lg border-b">
        <p className="text-center text-sm">Prodotti</p>
        <p className="text-center text-sm">Titolo</p>
        <p className="text-center text-sm">Prezzo</p>
        <p className="text-center text-sm">Quantità</p>
        <p className="text-center text-sm">Totale</p>
        <p className="text-center text-sm">Rimuovi</p>
      </div>

      {/* Cart Items */}
      <div className="bg-white border-x border-b rounded-b-lg">
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-6 items-center gap-4 py-4 px-4 hover:bg-gray-50 transition duration-200">
                  <div className="flex justify-center">
                    <img
                      className="w-16 h-16 rounded-md object-cover"
                      src={url + '/images/' + item.image}
                      alt=""
                    />
                  </div>
                  <p className="text-center font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-center text-gray-600">$ {item.price}</p>
                  <p className="text-center font-semibold bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                    {cartItems[item._id]}
                  </p>
                  <p className="text-center font-semibold text-green-600">
                    $ {item.price * cartItems[item._id]}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-400 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition duration-200 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>
            );
          }
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Totale Carrello
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-gray-600">Sub Totale</p>
                <p className="font-semibold">$ {getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-gray-600">Spedizione</p>
                <p className="font-semibold">
                  $ {getTotalCartAmount() === 0 ? 0 : 2}
                </p>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-300">
                <b className="text-lg">Totale</b>
                <b className="text-lg text-green-600">
                  $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button
              onClick={() => navigate('/order')}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200"
            >
              Procedi al Checkout
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Codice Promozionale
            </h3>
            <p className="text-gray-600 mb-3">
              Se hai un Promo Code, inseriscilo qui
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg transition duration-200">
                Applica
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
