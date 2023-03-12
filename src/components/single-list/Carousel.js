import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShare } from 'react-icons/fa';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';
const Carousel = ({ imgUrls }) => {
  const [shareCopied, setShareCopied] = useState(false);
  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {imgUrls &&
          imgUrls.map((a, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={a} alt='img' />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div
        className='share-icon bg-warning rounded-circle d-flex align-items-center justify-content-center p-2 pointer'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareCopied(true);
          setTimeout(() => {
            setShareCopied(false);
          }, 3000);
        }}
      >
        <FaShare />
      </div>
      {shareCopied && (
        <span className='badge share-badge text-bg-light fs-6 fw-semibold'>
          تم نسخ اللينك
        </span>
      )}
    </>
  );
};

export default Carousel;
