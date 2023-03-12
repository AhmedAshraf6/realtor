import React from 'react';
import { GoLocation } from 'react-icons/go';
import { FaBed } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';
import { FaChair } from 'react-icons/fa';
import { FaParking } from 'react-icons/fa';

const Info = ({
  address,
  beds,
  description,
  furnished,
  name,
  offer,
  parking,
  paths,
  price,
  timestamp,
  type,
  discount,
}) => {
  return (
    <section className='info my-5 mx-3'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='listInfo'>
              <h4 className='text-primary text-semibold my-3'>
                {name} - {price} {type === 'rent' ? `/لكل شهر` : ''}
              </h4>
              <h5 className='my-3'>
                <GoLocation className='text-success' />
                {address}
              </h5>
              <div className='d-flex my-3 gap-3'>
                <span class='badge text-bg-success fs-6 fw-semibold'>
                  لل{type}
                </span>
                {offer && (
                  <span class='badge text-bg-danger fs-6 fw-semibold'>
                    {discount}جنيه تخفيض
                  </span>
                )}
              </div>
              <description className='my-3 fs-5'>
                الوصف - {description}
              </description>
              <div className='d-flex gap-2 my-3  align-items-center fs-6'>
                <div className='d-flex align-items-center gap-1 '>
                  <FaBed />
                  <span className='fw-semibold '>{beds}حمام</span>
                </div>
                <div className='d-flex align-items-center gap-1'>
                  <FaBath />
                  <span className='fw-semibold '> {paths}غرف نوم</span>
                </div>
                {parking && (
                  <div className='d-flex align-items-center'>
                    <FaParking />
                    مكان لركن السيارات
                  </div>
                )}
                {furnished && (
                  <div className='d-flex align-items-center'>
                    <FaChair />
                    أثاث
                  </div>
                )}
              </div>
              <button type='button' className='btn btn-primary w-100 my-3'>
                تواصل مع البائع
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
