import React, { useEffect, useRef, useState } from 'react';
import { FcHome } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';

const ProfileForm = () => {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const nameRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  //  Handle Logout Func
  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };
  // Handle Edit
  const handleEdit = async () => {
    try {
      if (name && auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          name,
        });
      }
      toast.success('تم تحديث بيناتك بنجاح');
    } catch (error) {
      toast.error('حدث خطأ ما حاول مرة أخري');
    }
  };
  useEffect(() => {
    if (isEdit) {
      nameRef.current.focus();
    }
  }, [isEdit]);
  return (
    <div className='col-md-6'>
      <div className='text-center'>
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
              disabled
            />
          </div>
          <div className='col-12'>
            <div className='position-relative'>
              <input
                type='text'
                className={`form-control ${
                  isEdit && 'bg-success border-success'
                }`}
                placeholder='اسمك'
                autoComplete='new-password'
                value={name}
                ref={nameRef}
                disabled={!isEdit}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='d-flex flex-column gap-3 flex-sm-row align-items-center justify-content-between text-dark my-4'>
          <div className='d-flex align-items-center'>
            <h6 className='m-0 p-0'>هل تريد تغيير اسمك ؟</h6>
            <button
              className='bg-transparent text-danger fw-bold px-1'
              onClick={() => {
                isEdit && handleEdit();
                setIsEdit((prevState) => !prevState);
              }}
            >
              {isEdit ? 'حفظ النتائج' : '    تعديل'}
            </button>
          </div>
          <span
            className='text-primary pointer
          '
            onClick={handleLogout}
          >
            تسجيل خروج
          </span>
        </div>

        <button type='button' className='btn btn-primary w-100'>
          <Link
            to='/createlist'
            className='text-white text-decoration-none d-flex align-items-center justify-content-center'
          >
            بيع أو استأجر منزلك
            <FcHome className='me-1 p-1 bg-light fs-3 rounded-circle' />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
