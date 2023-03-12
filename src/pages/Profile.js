import React from 'react';
import MyList from '../components/profile/MyList';
import ProfileForm from '../components/profile/ProfileForm';

const Profile = () => {
  return (
    <section className='prfile d-flex justify-content-center align-items-center my-4'>
      <div className='container-fluid row gy-3 d-flex align-items-center justify-content-center'>
        <h2 className='text-dark text-center my-2 my-md-4 '>الملف الشخصي</h2>
        <ProfileForm />
        <MyList />
      </div>
    </section>
  );
};

export default Profile;
