import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LoadingSpinned from '../components/shared-components/LoadingSpinned';
import Carousel from '../components/single-list/Carousel';
import Info from '../components/single-list/Info';
import { db } from '../firebase';

const SingleList = () => {
  const { singleid } = useParams();
  const [singleList, setSingleList] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDoc = async () => {
      const singleDoc = await getDoc(doc(db, 'listings', singleid));
      setSingleList(singleDoc.data());
      setLoading(false);
    };
    singleid && fetchDoc();
  }, [singleid]);
  if (loading) {
    return <LoadingSpinned />;
  }
  return (
    <section className='single-list'>
      <Carousel {...singleList} singleid={singleid} />
      <Info {...singleList} />
    </section>
  );
};

export default SingleList;
