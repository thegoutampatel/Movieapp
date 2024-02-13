import React, { useEffect, useState } from 'react'
import { IoMdStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";

//skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';


const TopRated = () => {
  const [topM, setTopM] = useState([]);
  const [err, SetErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load , setLoad] = useState(true);

  useEffect(() => {
   
    const a = setTimeout(() => {
      setLoad(false)
    }, 3000);
   
    try {
      async function fetchMovies() {
        setLoading(true);
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
        );
        const data = await response.json();
        setTopM(data.results);
        setLoading(false);
      }
      fetchMovies();

    } catch (error) {
      SetErr("Error to fetch");
    }
  }, []);

  if (err) {
    return <div>{err}</div>;
  }
  if(loading) return <div className=" h-[100vh] bg-black text-white text-center">Loading......</div>

  return (
    <div className="flex flex-col w-[100vw] lg:w-[90vw] mx-auto mt-10  h-full">
      <h2 className=" text-3xl font-semibold">Top Rated</h2>
      <div className="flex flex-wrap w-[100vw] lg:w-[85vw] justify-center mt-10  gap-3 h-full mb-10">
  {load ? (<SkeletonTheme baseColor="#E5D8D5" highlightColor="#fff">
    <div>
      <Skeleton count={20} containerClassName="flex flex-wrap w-[100vw] lg:w-[90vw] justify-center gap-2 h-full" className="rounded-lg w-38 lg:w-48 h-64 lg:h-72 border border-gray-400" />
    </div>
  </SkeletonTheme>) : (
    
    topM.map((item) => (
    <Link
      key={item.id} to={`/popular/${item.id}`}
      className="relative rounded-lg cursor-pointer transition-transform duration-500 hover:scale-125 hover:z-50 z-0"
       // Set z-index for the container div
    >
      <img
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        className="rounded-lg w-38 lg:w-48 h-64 lg:h-72 border border-gray-400  relative hover:opacity-50 z-10" // Set z-index for the image
        alt="img"
      />
      <div className="absolute bottom-10 left-0 p-2 flex flex-col">
        <p className="text-white text-xl font-bold">{item.original_title}</p>
        <div className="flex gap-7">
          <p className=" text-white">{item.release_date}</p>
          <p className="text-white flex items-center gap-1">
            {item.vote_average.toFixed(1)} <IoMdStarHalf />
          </p>
        </div>
        <p className="text-white text-[10px]">{item.overview.slice(0,60)}.....</p>
      </div>
    </Link>)
  ))}
</div>

    </div>
  )
}

export default TopRated