import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import GoogleSign from './GoogleSign';

const ForegetPassForm = () => {
  // Handle Submit Func
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success('تم ارسال الايميل بنجاح');
      } catch (error) {
        toast.error('الإيميل غير موجود ');
      }
    }
  };
  return (
    <div className='col-lg' onSubmit={handleSubmit}>
      <form className='text-center'>
        <div className='row gy-4 gx-3'>
          <div className='col-12'>
            <input
              type='email'
              className='form-control'
              placeholder='البريد الألكتروني'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='d-flex flex-column flex-sm-row align-items-center justify-content-between text-dark my-4'>
          <div className='d-flex align-items-center'>
            <h6 className='m-0 p-0'>ليس لديك حساب؟</h6>
            <Link
              to='/signup'
              className='text-decoration-none text-danger fw-bold px-1'
            >
              سجل حساب
            </Link>
          </div>
          <Link className='text-primary text-decoration-none' to='/signin '>
            سجل دخول
          </Link>
        </div>
        <button class='btn btn-primary w-100' type='submit'>
          ارسال إيميل استرجاع
        </button>
        <p className='my-4 fw-bold or'>أو</p>
        <GoogleSign />
      </form>
    </div>
  );
};

export default ForegetPassForm;
