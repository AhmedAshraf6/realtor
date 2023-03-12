import React from 'react';
import Slider from '../components/home/Slider';
import BoxList from '../components/profile/BoxList';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

export default function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');
        // create the query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');
        // create the query
        const q = query(
          listingsRef,
          where('type', '==', 'rent'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for rent
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');
        // create the query
        const q = query(
          listingsRef,
          where('type', '==', 'sell'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div className='home'>
      <Slider />
      <div className=''>
        {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 mt-6 fw-semibold'>اخر العروض</h2>
            <Link className='text-decoration-none' to='/offers'>
              <p className='px-3'>اظهار مزيد من العروض</p>
            </Link>
            <ul className='row gy-3'>
              {offerListings.map((listing) => (
                <BoxList key={listing.id} {...listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 mt-6 fw-semibold'>اماكن للإيجار</h2>
            <Link className='text-decoration-none' to='/category/rent'>
              <p className='px-3'>اظهار جميع الاماكن للأيجار</p>
            </Link>
            <ul className='row gy-3'>
              {rentListings.map((listing) => (
                <BoxList key={listing.id} {...listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 mt-6 fw-semibold'>اماكن للبيع</h2>
            <Link className='text-decoration-none' to='/category/sell'>
              <p className='px-3'>اظهار جميع أماكن للبيع</p>
            </Link>
            <ul className='row gy-3'>
              {saleListings.map((listing) => (
                <BoxList key={listing.id} {...listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
