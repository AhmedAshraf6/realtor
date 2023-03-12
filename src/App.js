import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForegetPassword from './pages/ForegetPassword';
import ShareLayout from './components/shared-components/ShareLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/shared-components/PrivateRoute';
import CreateList from './pages/CreateList';
import EditList from './pages/EditList';
import SingleList from './pages/SingleList';
import Category from './pages/Category';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ShareLayout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<PrivateRoute />}>
              <Route index element={<Profile />} />
            </Route>

            <Route path='offers' element={<Offers />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='createlist' element={<PrivateRoute />}>
              <Route index element={<CreateList />} />
            </Route>
            <Route path='editlist' element={<PrivateRoute />}>
              <Route path='/editlist/:editId' element={<EditList />} />
            </Route>
            <Route path='foregtpassword' element={<ForegetPassword />} />
            <Route path='category/:categoryName' element={<Category />} />
            <Route path='/singlelist/:singleid' element={<SingleList />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
