import React from 'react'
import { useEffect, useState } from "react";
import noimg from '../assets/no-img.png';
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const SearchM = () => {

  const [r, setR] = useState([]);
  const [search, setSearch] = useState("");
  const [err , SetErr] = useState("");
  useEffect(()=>{

    try {
        async function fetchMovies() {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${search}`
          );
          const data = await response.json();
          console.log(data);
          setR(data.results);

        }
        fetchMovies();
      } catch (error) {
        SetErr("Error to fetch");
      }
      
     console.log(r);
  },[search])


  return (
    <div className='w-screen min-h-screen bg-black flex justify-center mt-16'>
      <div className=''>
        <div className='relative'>
        <IoSearchSharp className=' absolute top-2.5 ml-3 text-[20px]' />
        <input type="text"  onChange={(e)=>setSearch(e.target.value)} placeholder='Search Anything' className='lg:w-[50vw] w-[80vw] h-[40px] bg-transparent border rounded-lg pl-10' />
        </div>

          {
            r.map( item =>(
              <div key={item.id} className='lg:w-[50vw] mt-5 w-[80vw] h-[10vh] rounded-sm flex items-center gap-10'>
                 <img src={item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original${item.poster_path || item.profile_path}` : noimg} alt="" className=' lg:w-[4vw] w-[15vw] rounded-xl h-[9vh] ml-2' />
                 <p>{item.title || item.name || item.original_name ? `${item.name || item.title || item.original_name} `: "Title Not Available" }</p>
              </div>
            ))  
          }
      </div>
    </div>
  )
}

export default SearchM