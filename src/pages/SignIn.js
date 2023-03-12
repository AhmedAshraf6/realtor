import React from 'react';
import ImgContainer from '../components/sign/ImgContainer';
import SignInForm from '../components/sign/SignInForm';

const SignIn = () => {
  return (
    <section className='signin d-flex justify-content-center align-items-center my-4'>
      <div className='container row gy-3 d-flex align-items-center'>
        <h2 className='text-dark text-center my-2 my-md-4 '>تسجيل دخول</h2>
        <ImgContainer />
        <SignInForm />
      </div>
    </section>
  );
};

export default SignIn;
