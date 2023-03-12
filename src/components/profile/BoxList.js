import React from 'react';
import cardImg from '../../assets/card.jpg';
import { ImLocation } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const BoxList = ({
  imgUrls,
  address,
  name,
  price,
  offer,
  discount,
  beds,
  paths,
  id,
  onEdit,
  onDelete,
}) => {
  return (
    <div className='col-sm-6 col-md-4 col-xl-3 '>
      <div className='card h-100 p-0 pointer'>
        <Link to={`/singlelist/${id}`} className='text-decoration-none'>
          <img src={imgUrls[0]} className='card-img-top' alt='card-img' />
          <div className='card-body'>
            <div className='d-flex align-items-center my-2'>
              <ImLocation className='text-success' />
              <span className='text-muted'>{address}</span>
            </div>
            <h5 className='card-title fw-bold'>{name}</h5>
            <p className='card-text text-info fw-semibold'>
              {offer ? discount : price} جنيه / شهر
            </p>
            s
          </div>
        </Link>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex gap-2 text-primary'>
              <span>{beds} غرفة نوم</span>
              <span>{paths} حمام</span>
            </div>
            <div className='d-flex align-items-center gap-2 '>
              {onEdit && (
                <MdEdit className='text-dark ' onClick={() => onEdit(id)} />
              )}
              {onDelete && (
                <AiFillDelete
                  className='text-danger'
                  onClick={() => onDelete(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxList;
