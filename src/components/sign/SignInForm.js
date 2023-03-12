import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import GoogleSign from './GoogleSign';
const SignInForm = () => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const passRef = useRef();
  useEffect(() => {
    eye ? (passRef.current.type = 'text') : (passRef.current.type = 'password');
  }, [eye]);
  // Handle Submit Func
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && pass) {
      try {
        const userCredintial = await signInWithEmailAndPassword(
          auth,
          email,
          pass
        );
        toast.success('تم تسجيل دخولك بنجاح');
        if (userCredintial.user) {
          navigate('/');
        }
      } catch (error) {
        toast.error('خطأ في تسجيل الدخول حاول مرة أخري');
      }
    }
  };
  return (
    <div className='col-lg'>
      <form className='text-center' onSubmit={handleSubmit}>
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
          <div className='col-12'>
            <div className='position-relative'>
              <input
                type='password'
                className='form-control'
                placeholder='كلمة السر'
                autoComplete='new-password'
                ref={passRef}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              {eye ? (
                <AiFillEyeInvisible
                  className='position-absolute fs-5 eye-icon pointer'
                  onClick={() => setEye(!eye)}
                />
              ) : (
                <AiFillEye
                  className='position-absolute fs-5 eye-icon pointer'
                  onClick={() => setEye(!eye)}
                />
              )}
            </div>
          </div>
        </div>
        <div className='d-flex flex-column gap-3 flex-sm-row align-items-center justify-content-between text-dark my-4'>
          <div className='d-flex align-items-center'>
            <h6 className='m-0 p-0'>ليس لديك حساب؟</h6>
            <Link
              to='/signup'
              className='text-decoration-none text-danger fw-bold px-1'
            >
              سجل حساب
            </Link>
          </div>
          <Link
            className='text-primary text-decoration-none'
            to='/foregtpassword'
          >
            هل نسيت كلمة السر؟
          </Link>
        </div>
        <button class='btn btn-primary w-100' type='submit'>
          تسجيل دخول
        </button>
        <p className='fw-bold or my-3'>أو</p>

        <GoogleSign />
      </form>
    </div>
  );
};

export default SignInForm;
