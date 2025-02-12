
import { Route, Routes } from 'react-router-dom';
import Home from './pages/User/home';
import HomeCenterContent from './components/User/HomeCenterContent';
import Chat from './components/User/Chat';
import Lession from './pages/Admin/Lession';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-medium-image-zoom/dist/styles.css'
import AAddQAndA from './components/Admin/AAddQAndA';
import LessionDoing from './components/User/LessionDoing';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<HomeCenterContent />} />
          <Route path='/chat' element={<Chat />} />


        </Route>
        <Route path='/admin' element={<Lession />} />

        <Route path='/admin/CRUDQuestion' element={<AAddQAndA />} />

        <Route path='/doingLess' element={<LessionDoing />} />
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
