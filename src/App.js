
import { Route, Routes } from 'react-router-dom';
import Home from './pages/User/home';
import HomeCenterContent from './components/User/HomeCenterContent';
import Chat from './components/User/Chat';
import Lession from './pages/Admin/Lession';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<HomeCenterContent />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
        <Route path='/admin' element={<Lession />}>

        </Route>
      </Routes>

    </>
  );
}

export default App;
