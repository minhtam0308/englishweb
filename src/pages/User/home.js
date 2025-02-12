
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/home.css';
import { useState } from 'react';
import HomeHeader from '../../components/User/HomeHeader';
import HomeLeftContent from '../../components/User/HomeLeftContent';
import HomeRightContent from '../../components/User/HomeRightContent';
import RModalLoginUser from '../../components/User/RModalLoginUser';

import { Outlet } from 'react-router-dom';
import RegisterUser from '../../components/User/RegisterUser';


const Home = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <HomeHeader
                        handleShow={handleShow}
                    />
                </div>
                {!localStorage.user
                    ?

                    <RegisterUser />

                    :
                    <>
                        <div className="content-container">


                            <div className="content-left-container">
                                <HomeLeftContent />
                            </div>

                            <div className="content-center-container">
                                <Outlet />
                            </div>

                            <div className="content-right-cotainer">

                                <HomeRightContent />
                            </div>

                        </div>
                    </>}
            </div>

            <RModalLoginUser
                show={show}
                handleClose={handleClose}
            />

        </>
    )
}
export default Home;