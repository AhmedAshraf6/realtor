import React from 'react';

const LoadingSpinned = () => {
  return (
    // <div class='d-flex justify-content-center'>
    //   <div class='pinner-grow' role='status'>
    //     <span class='visually-hidden'>Loading...</span>
    //   </div>
    // </div>
    <div className='d-flex justify-content-center'>
      <div className='spinner-border m-5' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinned;
