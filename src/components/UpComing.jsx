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
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';


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
      console.log(upcommingM);
    } catch (error) {
      SetErr("Error to fetch");
    }
  }, []);

  if (err) {
    return <div>{err}</div>;
  }
  if(loading) return <div className=" h-[100vh] bg-black text-white text-center">Loading......</div>
  return (
    <div className='mx-auto mt-8'>
      {showHeading && <h2 className=" text-3xl font-semibold mb-2 ml-10">UpComming</h2>}
         <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {upcommingM.map(item =>(
          <div key={item.id}>
            <SwiperSlide><img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" /></SwiperSlide> 
          </div>
        ))}
        {/* <SwiperSlide>{`https://image.tmdb.org/t/p/original${upcommingM.poster_path}`}</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </div>
  )
}

export default UpComing