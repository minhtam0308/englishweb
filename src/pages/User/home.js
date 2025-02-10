
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/home.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import HomeHeader from '../../components/User/HomeHeader';
import HomeLeftContent from '../../components/User/HomeLeftContent';
import HomeRightContent from '../../components/User/HomeRightContent';
import RModalLoginUser from '../../components/User/RModalLoginUser';

import { NavLink, Outlet } from 'react-router-dom';


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

                <div className="content-container">
                    <div className="content-left-container">
                        <HomeLeftContent />
                    </div>
                    {localStorage.user
                        ?
                        <div className="content-center-container">
                            <Outlet />
                        </div>
                        :
                        <div className="content-center-container">
                            <div className='center-content text-center'>
                                <NavLink
                                    to={'/registerUSer'}
                                >
                                    <Button className='btn btn-secondary'>Register</Button>
                                </NavLink> </div>

                        </div>

                    }
                    <div className="content-right-cotainer">

                        <HomeRightContent />
                    </div>
                </div>
            </div>

            <RModalLoginUser
                show={show}
                handleClose={handleClose}
            />

        </>
    )
}
export default Home;