import React, { useEffect, useState } from 'react'
import { IoMdStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";
// Swipper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './UpComming.css';

// import required modules
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';


const UpComing = ({showHeading}) => {
  const [upcommingM, setUpcommingM] = useState([]);
  const [err, SetErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      async function fetchTopM() {
        setLoading(true);
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
        );
        const data = await response.json();
        setUpcommingM(data.results);
        setLoading(false);
      }
      fetchTopM();
     
    } catch (error) {
      SetErr("Error to fetch");
    }
  }, []);

  if (err) {
    return <div>{err}</div>;
  }
  if(loading) return <div className=" h-[100vh] bg-black text-white text-center">Loading......</div>
  return (
    <div className='mx-auto h-full pb-10 overflow-hidden bg-black flex flex-col items-center'>
         <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[ Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {upcommingM.map(item =>(
          <div key={item.id}>
            <SwiperSlide key={item.id}><img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" /></SwiperSlide> 
          </div>
        ))}
      </Swiper>
      <h2 className=" text-sm font-semibold lg:mt-5 mt-0">UpComming</h2>
    </div>
  )
}

export default UpComing