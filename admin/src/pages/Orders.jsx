import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { assets } from '../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.data) {
      setOrders(response.data.data);    
    } else {
      toast.error('Error');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: event.target.value
    })
    if(response.data.success)
      await fetchAllOrders();
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className=" w-[90%] bg-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 ml-25">
        Pagina degli Ordini
      </h3>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div className="flex justify-center md:justify-start" key={index}>
            <img className="w-20 h-20" src={assets.parcel_icon} alt="" />
            <div
              className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-4 px-5 text-sm 
             border border-gray-200 rounded-lg shadow-sm bg-white md:col-span-2"
            >
              <p className="mb-5 text-xs text-gray-600 ">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="font-semibold ml-10">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', '}
                </p>
              </div>
              <p className="flex gap-2">
                <img className="w-5" src={assets.phone_icon} alt="" />
                {order.address.phone}
              </p>
              <p className="text-xl">Items: {order.items.length}</p>
              <p className="text-green-500 text-xl">$ {order.amount}</p>
              <select onChange={() => statusHandler(event, order._id)} value={order.status}
              className="border rounded bg-white text-gray-600 outline-none">
                <option value="Food Processing">In Preparazione</option>
                <option value="Out for delivery">In Spedizione</option>
                <option value="Delivered">Pagato</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
