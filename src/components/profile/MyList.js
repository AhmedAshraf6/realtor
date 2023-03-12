import React, { useEffect, useState } from 'react';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import BoxList from './BoxList';
import LoadingSpinned from '../shared-components/LoadingSpinned';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const MyList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      const collectionRef = collection(db, 'listings');
      const q = query(
        collectionRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let list = [];
      querySnap.forEach((doc) => {
        return list.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(list);
      setLoading(false);
    };
    fetchListing();
  }, [auth.currentUser.uid]);
  if (loading) {
    <LoadingSpinned />;
  }
  const onEdit = (listID) => {
    navigate(`/editlist/${listID}`);
  };
  const onDelete = async (listId) => {
    if (window.confirm('هل أنت متأكد من حذف القائمة')) {
      await deleteDoc(doc(db, 'listings', listId));
      const updateListing = listings.filter((listid) => listid.id !== listId);
      setListings(updateListing);
      toast.success('تم حذف القائمة بنجاح');
    }
  };

  return (
    <section className='mylist my-4'>
      <h4 className='text-dark text-semibold text-center my-4'>قائمتي</h4>
      <div className='row g-3'>
        {listings &&
          listings.map((list) => {
            console.log(list);
            return (
              <BoxList
                key={list.id}
                {...list.data}
                id={list.id}
                onEdit={() => onEdit(list.id)}
                onDelete={() => onDelete(list.id)}
              />
            );
          })}
      </div>
    </section>
  );
};

export default MyList;
