import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const List = ({url}) => {

  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('error');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("error")
    }
  } 
  
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='flex flex-col py-3 items-center w-[90%] bg-gray-100'>
      <p className='text-2xl mb-4 font-semibold'>Tutta la lista Prodotti</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]
       bg-gray-300 border items-center gap-38 py-1 px-2 text-sm'>
          <b>Immagine</b>
          <b>Nome</b>
          <b>Categoria</b>
          <b>Prezzo</b>
          <b className='text-center'>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className='grid gap-40 grid-cols-[1fr_3Fr_1fr] lg:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center 
             py-1 px-2 border text-sm' key={index}>
              <img className='w-10 my-3 rounded-[10px]'
               src={`${url}/images/`+item.image} alt="" />
              <p className='mt-3'>{item.name}</p>
              <p className='mt-3'>{item.category}</p>
              <p className='mt-3'>$ {item.price}</p>
              <p onClick={() => removeFood(item._id)} className='text-right md:text-center text-lg mt-3 cursor-pointer'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default List;
