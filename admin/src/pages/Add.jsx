import React, {  useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Add = ({url}) => {    

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }   

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)      
        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }  else {
            toast.error(response.data.message)
        }
    }    

  return (
    <div className='w-[70%] ml-15 mt-7 text-gray-500 font-medium text-base'>
        <form onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-4'>
                <p className='font-semibold'>Carica immagine</p>
                <label htmlFor="image">
                    <img className='cursor-pointer w-30'
                     src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input className='border border-gray-400 w-50 rounded-md p-1'
                onChange={(e) => setImage(e.target.files[0])}
                 type="file"  id="image" hidden required />
            </div>
            <div className='flex flex-col mt-4  gap-1'>
                <p className='font-semibold'>Nome del Prodotto</p>
                <input onChange={onChangeHandler} value={data.name}
                 className='p-1 border rounded-md w-70'
                 type="text" name="name" placeholder=' Scrivi qui' />
            </div>
            <div className='mt-4'>
                <p className='font-semibold'>Descrizione del Prodotto</p>
                <textarea onChange={onChangeHandler} value={data.description}
                className='border border-gray-300 p-3'
                 name='description' row="6" placeholder='Scrivi qui il contenuto'>                    
                </textarea>
            </div>
            <div className='mt-6 flex gap-7'>
                <div className=''>
                    <p className='font-semibold'>Categorie Prodotti</p>
                    <select onChange={onChangeHandler} 
                     className='border' name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls & Meat</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className='mb-5 '>
                    <p className='font-bold'>Prezzo</p>
                    <input onChange={onChangeHandler} value={data.price}
                    className='border border-gray-400 w-15'
                     type="Number" name="price" placeholder='$20' />
                </div>
            </div>
            <button className='bg-orange-500 text-white p-1 mb-7 rounded-md' type='submit'>Aggiungi</button>
        </form>
    </div>
  )
}

export default Add