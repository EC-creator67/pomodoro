import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-5 border-b bg-white">
      <img className="w-40" src={assets.logo} alt="" />
      <img className='w-7' src={assets.profile_icon} alt="" />
    </div>
  );
};

export default Navbar;
