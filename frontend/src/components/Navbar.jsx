  import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('menu');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  }

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-950/80 border-b border-gray-200/20
     dark:border-gray-800/20 transition-all duration-300 flex justify-between p-4 -mb-3">
      <div>        
        <div className="-mb-10">
          <p className="flex flex-col text-red-500 italic -mt-3 font-bold text-3xl">Pomodoro
            <span className="text-green-600 -mt-2">Ristorante</span>
            </p>
      <div className=" text-green-400 border "></div>
        </div>
      </div>
      <ul className="hidden lg:flex gap-5 font-semibold text-violet-800 cursor-pointer">
        {/* <Link
          to={'/'}
          onClick={() => setMenu('home')}
          className={` ${
            menu === 'home' ? ' pb-2 border-b-2 border-orange-500' : ''
          } text-2xl`}
        >
          Home
        </Link> */}

        <a
          href="#home"
          onClick={() => setMenu('home')}
          className={` ${
            menu === 'home' ? ' pb-2 border-b-2 border-orange-500' : ''
          } text-2xl`}
        >
          Home
        </a>
         <a
          href="#explore-menu"
          onClick={() => setMenu('menu')}
          className={` ${
            menu === 'menu' ? ' pb-2 border-b-2 border-orange-500' : ''
          } text-2xl`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu('mobile-app')}
          className={`${
            menu === 'mobile-app' ? ' pb-2 border-b-2 border-orange-500' : ''
          } text-2xl`}
        >
          Mobile-app
        </a>
        <a
          href="#contattaci"
          onClick={() => setMenu('contattaci')}
          className={`${
            menu === 'contattaci' ? ' pb-2 border-b-2 border-orange-500' : ''
          } text-2xl`}
        >
          Contattaci
        </a>
      </ul>
      <div className="flex space-x-5 relative ">
        <img
          className="cursor-pointer mr-6 w-5"
       
          src={assets.search_icon}
          alt="search-icon"
        />
        <div className="flex space-x-3">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div
            className={`${
              getTotalCartAmount() === 0
                ? ''
                : 'absolute min-w-[10px] min-h-[10px] bg-orange-500 -top-[6px] right-[76px]'
            }`}
          ></div>
        </div>
        
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="border border-orange-500 text-violet-500 px-3 py-1 ml-4
          hover:bg-orange-500 hover:text-white rounded-md transition duration-300"
          >
            Accedi
          </button>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <img
              className="cursor-pointer hover:opacity-75 transition duration-200"
              src={assets.profile_icon}
              alt=""
            />
            {showProfileDropdown && (
              <ul
                className="absolute top-8 right-0 z-10 bg-white p-8 rounded-md 
              shadow-md"
              >
                <li onClick={() => navigate('/myorders')}
                 className="flex items-center gap-2  px-8 py-2 cursor-pointer hover:bg-orange-300 rounded transition duration-200">
                  <img src={assets.bag_icon} alt="" />
                  <p>Ordini</p>
                </li>
                <hr className="my-2" />
                <li
                  className="flex items-center gap-2 py-2 px-8 cursor-pointer hover:bg-gray-300 rounded transition duration-200"
                  onClick={logout}
                >
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
