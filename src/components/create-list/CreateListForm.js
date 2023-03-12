import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth, db } from '../../firebase';
import { async } from '@firebase/util';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router';
const CreateListForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    beds: '1',
    paths: '1',
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: true,
    price: '0',
    discount: '0',
    images: {},
  });
  const [loading, setLoading] = useState(false);
  const {
    type,
    name,
    beds,
    paths,
    parking,
    furnished,
    address,
    description,
    offer,
    price,
    discount,
    images,
  } = formData;
  const handleChange = (e) => {
    let bool = null;

    if (e.target.value === 'true') {
      bool = true;
    }
    if (e.target.value === 'false') {
      bool = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: bool ?? e.target.value,
      }));
    }
  };
  const [al, setAl] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+discount >= +price) {
      setLoading(false);
      toast.error('Discounted price needs to be less than regular price');
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error('maximum 6 images are allowed');
      return;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discount;
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);
    toast.success('تم اضافة إعلانك بنجاح');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };
  if (loading) {
    return <h3>loading...</h3>;
  }
  return (
    <section className='my-4 px-2'>
      <h1 className=' text-dark text-center  mb-3'>اضافة قائمة</h1>
      <form onSubmit={handleSubmit}>
        <p className='text-dark fs-5 fw-semibold'>بيع / اشتري</p>
        <div className='d-flex gap-2'>
          <button
            type='button'
            id='type'
            className={`btn shadow-sm w-100 fw-semibold ${
              type === 'rent' ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value='sell'
            onClick={handleChange}
          >
            بيع
          </button>
          <button
            type='button'
            id='type'
            className={`btn shadow-sm w-100 fw-semibold ${
              type === 'rent' ? 'btn-gray800 text-white' : 'btn-light text-dark'
            }`}
            value='rent'
            onClick={handleChange}
          >
            إيجار
          </button>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>الاسم</p>
        <input
          type='text'
          className='form-control'
          placeholder='الاسم'
          id='name'
          autoComplete='off'
          value={name}
          onChange={handleChange}
          minLength='10'
          maxLength='50'
          required
        />
        <div className='d-flex gap-3 mt-3'>
          <div>
            <p className='text-dark fs-5 fw-semibold'>السراير</p>
            <input
              type='number'
              className='form-control'
              value={beds}
              id='beds'
              onChange={handleChange}
              min='1'
              max='30'
              required
            />
          </div>
          <div>
            <p className='text-dark fs-5 fw-semibold '>الحمام</p>
            <input
              type='number'
              id='paths'
              className='form-control'
              value={paths}
              onChange={handleChange}
              min='1'
              max='10'
              required
            />
          </div>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>ركنة للعربيات ؟</p>
        <div className='d-flex gap-2'>
          <button
            type='button'
            id='parking'
            className={`btn shadow-sm w-100 fw-semibold ${
              !parking ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            onClick={handleChange}
            value={true}
          >
            نعم
          </button>
          <button
            type='button'
            id='parking'
            className={`btn shadow-sm w-100 fw-semibold ${
              parking ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value={false}
            onClick={handleChange}
          >
            لا
          </button>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>مفروشة ؟</p>
        <div className='d-flex gap-2'>
          <button
            type='button'
            id='furnished'
            className={`btn shadow-sm w-100 fw-semibold ${
              !furnished ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value={true}
            onClick={handleChange}
          >
            نعم
          </button>
          <button
            type='button'
            id='furnished'
            className={`btn shadow-sm w-100 fw-semibold ${
              furnished ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value={false}
            onClick={handleChange}
          >
            لا
          </button>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>العنوان ؟</p>
        <div className='form-floating'>
          <textarea
            className='form-control'
            placeholder='العنوان'
            value={address}
            onChange={handleChange}
            id='address'
            required
          ></textarea>
          <label htmlFor='address'>العنوان</label>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>الوصف ؟</p>
        <div className='form-floating'>
          <textarea
            className='form-control'
            placeholder='الوصف'
            value={description}
            onChange={handleChange}
            id='description'
            required
          ></textarea>
          <label htmlFor='description'>الوصف</label>
        </div>
        <p className='text-dark fs-5 fw-semibold mt-3'>يوجد عرض ؟</p>
        <div className='d-flex gap-2'>
          <button
            type='button'
            id='offer'
            className={`btn shadow-sm w-100 fw-semibold ${
              !offer ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value={true}
            onClick={handleChange}
          >
            نعم
          </button>
          <button
            type='button'
            id='offer'
            className={`btn shadow-sm w-100 fw-semibold ${
              offer ? 'btn-light text-dark' : 'btn-gray800 text-white'
            }`}
            value={false}
            onClick={handleChange}
          >
            لا
          </button>
        </div>
        <div className='d-flex mt-3'>
          <div>
            <p className='text-dark fs-5 fw-semibold'>السعر الأساسي</p>
            <div className='d-flex align-items-center gap-3'>
              <input
                type='number'
                id='price'
                className='form-control'
                value={price}
                onChange={handleChange}
                min='100'
                required
              />
              {type === 'rent' && (
                <p className='text-nowrap  p-0 m-0 fw-semibold'>
                  {' '}
                  جنيه / لكل شهر
                </p>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className='d-flex mt-3'>
            <div>
              <p className='text-dark fs-5 fw-semibold'>سعر التخفيض</p>
              <div className='d-flex align-items-center gap-3'>
                <input
                  type='number'
                  id='discount'
                  className='form-control'
                  value={discount}
                  onChange={handleChange}
                  min='100'
                  required
                />
              </div>
            </div>
          </div>
        )}
        <div className='mt-3'>
          <p className='fs-5 fw-semibold'>الصور</p>
          <p className='fw-semibold text-muted'>
            أول صورة ستكون الغلاف <span>(الحد الأقصي للصور 6)</span>
          </p>
          <input
            type='file'
            className='form-control'
            id='images'
            onChange={handleChange}
            multiple
            accept='.jpg,.png,.jpeg'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary w-100 fw-bold mt-3'>
          اضافة قائمة
        </button>
      </form>
    </section>
  );
};

export default CreateListForm;
