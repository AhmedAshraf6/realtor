import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import EditListForm from '../components/edit-list/EditListForm';
import LoadingSpinned from '../components/shared-components/LoadingSpinned';
import { auth, db } from '../firebase';

const EditList = () => {
  const { editId } = useParams();
  const [singleList, setSingleList] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoc = async () => {
      const singleDoc = await getDoc(doc(db, 'listings', editId));
      setSingleList(singleDoc.data());
      setLoading(false);
    };
    editId && fetchDoc();
  }, [editId]);

  // console.log(singleList.userRef);
  // console.log(auth.currentUser.uid);
  if (loading) {
    return <LoadingSpinned />;
  }
  return (
    <div className='mx-auto w-50 respon-width-mobile '>
      <EditListForm singleList={singleList} />
    </div>
  );
};

export default EditList;
