import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdStarHalf } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
const Details = () => {
   const [detailM, setDetailM] = useState({});
   const [error, setError] = useState(null);

   const Navigation = useNavigate();

   const {id} = useParams();
    useEffect(() => {
        try {
          async function fetchMovie() {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
            );
            const data = await response.json();
            setDetailM(data);
          }
          fetchMovie();
        } catch (error) {
          setError("Error to fetch");
        }
      }, [id]);
    
      if (error) {
        return <div>{error}</div>;
      }
    

  return (
    <div class="relative h-full w-full">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black"></div>
      <img src={`https://image.tmdb.org/t/p/original${detailM.backdrop_path}`} class="h-[90vh] w-[100vw] object-cover" alt="Your Image"></img>
      <div className='absolute bottom-10 lg:bottom-32 flex gap-6 left-6 flex-col lg:flex-row'>
        <img src={`https://image.tmdb.org/t/p/original${detailM.poster_path}`} alt="" className='lg:w-[18vw] h-[40vh] w-[15rem] lg:h-[50vh] rounded-md ' />
        <div className='flex flex-col gap-3'>
          <h2 className=' text-3xl lg:text-6xl font-bold'>{detailM.original_title}</h2>
          <p>{detailM.tagline}</p>
          <p className="flex items-center gap-1">
            {detailM.vote_average} <IoMdStarHalf /> ({detailM.vote_count})Votes
          </p>
          <p>Duration: {detailM.runtime} mins</p>
          <p>Release Date: {detailM.release_date}</p>
          <div className=' flex gap-3'>
            {detailM.genres && detailM.genres.map(item =>(
                <div key={item.id} className='border rounded-full px-4 py-3 text-center'>
                    {item.name}
                </div>
              ))}
          </div>

          <div className='flex gap-8 mt-3'>
            <a href={`https://www.imdb.com/title/${detailM.imdb_id}`}  target='_blank' className='bg-red-500 px-4 py-2 text-center rounded-lg flex items-center'>HomePage <FiExternalLink /></a>
            <a href={detailM.homepage} target='_blank' className='bg-green-500 px-4 py-2 text-center rounded-lg flex items-center'>IMDB <FiExternalLink /></a>
          </div>
          
          <button onClick={()=>{Navigation(-1)}} type="button" class="w-full flex items-center justify-center  px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            <IoMdArrowRoundBack /> 
            <span span>Go back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details