import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Iscriviti');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === 'Iscriviti') {
      newUrl += '/api/user/register';
    } else {
      newUrl += '/api/user/login';
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-10 flex items-center justify-center 
       bg-[#00000090] p-4"
    >    
      <form
        onSubmit={onLogin}
        className="w-full max-w-sm text-[#dd6413] bg-white flex flex-col
        gap-5 p-6 md:p-10 rounded-lg relative"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text font-bold">{currState}</h2>
          <img
            className="cursor-pointer flex w-5 absolute right-5 -mt-6"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="flex flex-col gap-3 text-red-500/70">
          {currState === 'Accedi' ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              className=" border-2 border-green-500 rounded p-2"
              type="text"
              placeholder="Il Tuo Nome"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className=" border-2 border-green-500 rounded p-2"
            type="text"
            placeholder="La Tua Email"
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            className=" border-2 border-green-500 rounded p-2"
            type="text"
            placeholder="La Tua Password"
            required
          />
        </div>
        <button
          type="submit"
          className=" py-2 text-sm rounded-md bg-orange-500 text-white 
            hover:bg-red-500 transition-colors"
        >
          {currState === 'Iscriviti' ? 'Iscriviti' : 'Accedi'}
        </button>

        <div className="flex items-start gap-2 ">
          <input type="checkbox" required className=''/>
          <p className=" text-xs text-[#dd6413] ">
            Accetto i termini e le condizioni.
          </p>
        </div>
        {currState === 'Accedi' ? (
          <p className=" text-sm gap-1 flex flex-wrap">
            Crea un Nuovo Account?{' '}
            <span
              className="text-sm cursor-pointer hover:underline"
              onClick={() => setCurrState('Iscriviti')}
            >
              Clicca Qui
            </span>
          </p>
        ) : (
          <p className="flex flex-wrap gap-1 text-sm ">
            Hai gia' un Account ?{' '}
            <span
              className=" text-sm cursor-pointer hover:underline"
              onClick={() => setCurrState('Accedi')}
            >
              Clicca Qui
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
