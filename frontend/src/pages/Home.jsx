import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodListDisplay from '../components/FoodListDisplay';
import AppDownload from '../components/AppDownload';



const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <div>
    <Header />
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodListDisplay category={category}/>
    <AppDownload />
    </div>
  )
}

export default Home