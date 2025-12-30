import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Errore nell'ordine");
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col lg:flex-row w-full items-start justify-between gap-8 mt-5 px-5 max-w-7xl mx-auto"
    >
      {/* order-left */}
      <div className="flex-1 max-w-2xl">
        <p className="text-2xl font-semibold mb-6 text-gray-800">
          Informazioni di Spedizione
        </p>
        <div className="mb-4 flex gap-3">
          <input
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  Nome"
          />

          <input
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  Cognome"
          />
        </div>

        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          className="border border-[#c5c5c5] mb-3 mr-3 rounded-md outline-orange-200"
          type="email"
          placeholder="  Indirizzo Email"
        />

        <input
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          className="border border-[#c5c5c5] mb-3 mr-3 rounded-md outline-orange-200"
          type="text"
          placeholder="  Strada"
        />

        <div className="mb-3">
          <input
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  Citta"
          />

          <input
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  Stato"
          />
        </div>

        <div className="mb-3">
          <input
            name="zip"
            value={data.zip}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  CAP"
          />

          <input
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
            type="text"
            placeholder="  Paese"
          />
        </div>

        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          className="border border-[#c5c5c5] mr-3 rounded-md outline-orange-200"
          type="text"
          placeholder="  Telefono"
        />
      </div>

      {/* order-right */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md sticky top-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Riepilogo Ordine
          </h2>
          <div className="space-y-4">
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
            <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-4">
              <b className="text-lg">Totale</b>
              <b className="text-lg text-green-600">
                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200 shadow-sm"
            type="submit"
          >
            Procedi al Pagamento
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
