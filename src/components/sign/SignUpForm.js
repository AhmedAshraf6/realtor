import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';
import GoogleSign from './GoogleSign';
const SignUpForm = () => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const passRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    eye ? (passRef.current.type = 'text') : (passRef.current.type = 'password');
  }, [eye]);
  // Handle Submit Func
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && pass && name) {
      try {
        const userCredintial = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const user = userCredintial.user;
        await setDoc(doc(db, 'users', user.uid), {
          email,
          name,
          timestamp: serverTimestamp(),
        });
        toast.success('تم تسجيل حسابك بنجاح');
        navigate('/');
      } catch (error) {
        toast.error('حدث خطأ ما حاول مرة أخري');
      }
    }
  };
  // console.log(auth.currentUser);
  return (
    <div className='col-lg'>
      <form className='text-center' onSubmit={handleSubmit}>
        <div className='row gy-4 gx-3'>
          <div className='col-12'>
            <input
              type='text'
              className='form-control'
              placeholder='اسمك بالكامل'
              autoComplete='off'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <h6 className='m-0 p-0'>لديك حساب ؟</h6>
            <Link
              to='/signin'
              className='text-decoration-none text-danger fw-bold px-1'
            >
              سجل دخول
            </Link>
          </div>
        </div>
        <button class='btn btn-primary w-100' type='submit'>
          تسجيل حساب
        </button>
        <p className='my-4 fw-bold or'>أو</p>
        <GoogleSign />
      </form>
    </div>
  );
};

export default SignUpForm;
