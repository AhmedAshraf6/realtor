import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router-dom';
import LoadingSpinned from '../shared-components/LoadingSpinned';
export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);
  if (loading) {
    return <LoadingSpinned />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    <>
      {listings && (
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: 'progressbar' }}
          effect='fade'
          modules={[EffectFade]}
        >
          {listings.map(({ data, id }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/singlelist/${id}`)}
              >
                <img
                  src={data.imgUrls ? data.imgUrls[0] : ''}
                  alt=''
                  className='w-100 h-100'
                  style={{ objectFit: 'contain' }}
                />

                <div className='position-relative'></div>
                <p className='text-white bg-primary rounded-pill py-1 px-3 position-absolute name-ad'>
                  {data.name}
                </p>
                <p className='text-white bg-primary rounded-pill py-1 px-3 position-absolute price-ad'>
                  {data.discount ?? data.price}جنيه
                  {data.type === 'rent' && ' / شهر'}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
