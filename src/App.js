
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/User/home';
import HomeCenterContent from './components/User/HomeCenterContent';
import DashBoard from './components/User/DashBoard';
import Lession from './components/Admin/Lession';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-medium-image-zoom/dist/styles.css'
import AAddQAndA from './components/Admin/AAddQAndA';
import LessionDoing from './components/User/LessionDoing';
import RegisterUser from './components/User/RegisterUser';
import { useContext, useEffect, useState } from 'react';
import { ContextAuth } from './Context/Context';
import { GetRefreshPage } from './api/apiUser';
import VerifyPage from './components/User/VerifyPage';
import HomeAdmin from './pages/Admin/HomeAdmin';
import BDashBoardAdmin from './components/Admin/BDashBoardAdmin';




function App() {
  const Auth = useContext(ContextAuth);
  const navigate = useNavigate();
  const location = useLocation();




  // console.log(location.pathname);
  useEffect(() => {
    const refreshAuth = async () => {

      // console.log(res)
      if (location.pathname === '/verify') {
        return;
      }
      // musicDoingLEss.pause();
      // musicDoingLEss.currentTime = 0;

      let res = await GetRefreshPage();
      if (res?.EC !== 0) {
        navigate('/registerUSer');
      } else {
        Auth.setAuth({
          auth: true,
          user: res.user
        });

      }

    }

    refreshAuth();

  }, [])




  // console.log(Auth.auth.user)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<HomeCenterContent />} />
          <Route path='/dashBoard' element={<DashBoard />} />
        </Route>
        {Auth.auth.user.role !== 'USER' &&
          <Route path='/admin' element={<HomeAdmin />}>
            <Route index element={<Lession />} />
            <Route path='/admin/dashBoard' element={<BDashBoardAdmin />} />
          </Route>}
        <Route path='/admin/CRUDQuestion' element={<AAddQAndA />} />
        <Route path='/doingLess' element={<LessionDoing />} />
        <Route path='/registerUSer' element={< RegisterUser />} />
        <Route path='/verify' element={< VerifyPage />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </>
  );
}

export default App;
