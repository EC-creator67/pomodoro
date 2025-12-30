import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
      const response = await axios.post(`${url}/api/order/verify`, {success, orderId})
      if(response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    }
    
  useEffect(() => {
    verifyPayment();
  })    

  return (
    <div className='min-h-[60vh] grid'>
        <div className='w-[150px] h-[150px] place-self-center border-t-green-300
         border-gray-300 border-2 rounded-[50%] animate-spin'></div>
    </div>
  )
}

export default Verify