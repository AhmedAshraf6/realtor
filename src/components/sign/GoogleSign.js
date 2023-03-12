import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';

const GoogleSign = () => {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const { email, displayName, uid } = res.user;
      const checkUser = await getDoc(doc(db, 'users', uid));
      if (!checkUser.exists()) {
        await setDoc(doc(db, 'users', uid), {
          email,
          name: displayName,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('خطأ ما في التسجيل بجوجل');
      console.log(error);
    }
  };
  return (
    <button
      class='btn btn-danger fw-bold  w-100 mb-2'
      type='button'
      onClick={handleGoogle}
    >
      متابعة باستخدام جوجل
      <FcGoogle className='text-center mx-1' />
    </button>
  );
};

export default GoogleSign;
