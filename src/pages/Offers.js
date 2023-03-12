import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';
import LoadingSpinned from '../components/shared-components/LoadingSpinned';
import BoxList from '../components/profile/BoxList';

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listing');
      }
    }

    fetchListings();
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listing');
    }
  }

  return (
    <div className='home'>
      <h1 className=' text-center mt-6 fw-bold mb-6'>العروض</h1>
      {loading ? (
        <LoadingSpinned />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='row gy-3'>
              {listings.map((listing) => (
                <BoxList key={listing.id} id={listing.id} {...listing.data} />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className='d-flex justify-content-center algin-items-center'>
              <button onClick={onFetchMoreListings} className='btn btn-primary'>
                حمل المزيد
              </button>
            </div>
          )}
        </>
      ) : (
        <p>لا يوجد مزيد من العروض</p>
      )}
    </div>
  );
}
