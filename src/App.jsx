import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Home from './components/Home'
import UpComing from './components/UpComing'
import IMBD_Logo from './assets/IMDB_Logo.png'
import Details from './components/Details'
import SearchM from './components/SearchM'

const App = () => {

  return (
    <div className=' bg-black w-full h-full text-white'>
        <nav className='flex items-center ml-10 gap-6 lg:gap-10 mb-2 pt-10 text-white font-bold'>
          <Link to="/"><img src={IMBD_Logo} alt="Logo" className='w-20'/></Link>
          <Link to="/popular" className='hover:underline transition-all duration-500'>Popular</Link>
          <Link to="/toprated" className='hover:underline transition-all duration-500'>Top Rated</Link>
          <Link to="/search" className='hover:underline transition-all duration-500'>Search</Link>
        </nav>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/search' element={<SearchM/>}/>
        <Route path='/toprated' element={<TopRated/>}/>
        {/* Dynamic Routes */}

        <Route path="/popular/:id" element={<Details/>}/>
        <Route path="/toprated/:id" element={<Details/>}/>
      </Routes>
    </div>
  )
}

export default App