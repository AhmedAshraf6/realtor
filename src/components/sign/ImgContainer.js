import React from 'react';
import img from '../../assets/sign.jpg';

const ImgContainer = () => {
  return (
    <div className='col-lg'>
      <div className='h-100 w-100'>
        <img src={img} alt='sign' className='w-100 h-100 rounded' />
      </div>
    </div>
  );
};

export default ImgContainer;
