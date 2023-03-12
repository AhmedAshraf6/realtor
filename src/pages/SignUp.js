import React from 'react';
import ImgContainer from '../components/sign/ImgContainer';
import SignUpForm from '../components/sign/SignUpForm';

const SignUp = () => {
  return (
    <section className='signup d-flex justify-content-center align-items-center my-4'>
      <div className='container row gy-3'>
        <h2 className='text-dark text-center my-2 my-md-4 '>تسجيل حساب</h2>
        <ImgContainer />
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
