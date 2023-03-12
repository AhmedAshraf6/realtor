import React from 'react';
import ForegetPassForm from '../components/sign/ForegetPassForm';
import ImgContainer from '../components/sign/ImgContainer';

const ForegetPassword = () => {
  return (
    <section className='foreget-pass d-flex justify-content-center align-items-center my-4'>
      <div className='container row gy-3 d-flex align-items-center'>
        <h2 className='text-dark text-center my-2 my-md-4 '>
          استرجاع كلمة السر
        </h2>
        <ImgContainer />
        <ForegetPassForm />
      </div>
    </section>
  );
};

export default ForegetPassword;
