import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className=" min-h-screen w-40 bg-white border-r">
      <div className="flex flex-col mb-5 ">
        <NavLink
          className={({ isActive }) =>
            `flex items-center py-5 pl-5 gap-2 border-b ${isActive ? "bg-red-500" : "bg-white"}`
          }
          to="/add"
        >
          <img className="w-7" src={assets.add_icon} alt="" />
          <p className=''>Aggiungi Prodotto</p>
        </NavLink>
        <NavLink
         className={({ isActive }) =>
            `flex  items-center py-5 pl-5 gap-2 border-b ${isActive ? "bg-blue-400" : "bg-white"}`
          }
          to={"/list"}>
        <img className="w-7" src={assets.order_icon} alt="" />
        <p className=''>Lista Prodotti</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center py-5 pl-5 gap-2 border-b ${isActive ? "bg-yellow-300" : "bg-white"}`
          } 
         to={"/orders"}>
        <img className="w-7" src={assets.order_icon} alt="" />
        <p className=''>Ordini</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
