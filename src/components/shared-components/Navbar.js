import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
const Navbar = () => {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
      } else {
        setSigned(false);
      }
    });
  }, [auth]);
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img
            src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
            alt='Bootstrap'
            className='h-100 w-50'
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbar'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          {/* <span className='navbar-toggler-icon'></span> */}
          <HiBars3CenterLeft />
        </button>
        <div className='collapse navbar-collapse ms-auto ' id='navbar'>
          <div className='navbar-nav me-auto'>
            <Link className='nav-link ' to='/'>
              الرئيسية
            </Link>
            <Link className='nav-link' to='/offers'>
              العروض
            </Link>
            <Link className='nav-link' to={`${signed ? 'profile' : 'signin'}`}>
              {signed ? 'الملف الشخصي' : 'تسجيل دخول'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
