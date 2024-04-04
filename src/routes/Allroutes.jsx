import React from 'react'
import { Routes, Route} from 'react-router-dom'

import Home from '../components/home/home';
import Counts from '../components/dashboard/Counts';


const Allroutes = () => {
  return (
    <>
    <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Counts />} />
    </Routes>
    </>
  )
}

export default Allroutes