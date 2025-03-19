
import logo from '../../assets/mochi-logo.webp';

import avarta from '../../assets/avatar.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ContextAuth } from '../../Context/Context';
import { useState } from 'react';

import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';

import { CiSettings } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import ModalLogOut from '../User/ModalLogOut';
import Setting from '../User/Setting';




const HomeHeaderAdmin = () => {
    const Auth = useContext(ContextAuth);



    const [showLogOut, setShowOut] = useState(false);
    const handleCloseOut = () => setShowOut(false);
    const handleShowOut = () => setShowOut(true);

    const [showSetting, setShowSetting] = useState(false);
    const handleCloseSetting = () => setShowSetting(false);
    const handleShowSetting = () => setShowSetting(true);

    const handleClickImageUser = () => {

        handleShowOut()

    }

    return (
        <>

            <div className="logo-container">
                <div className="logo">
                    <NavLink>
                        <img src={logo} alt="LOGO" />
                    </NavLink>
                </div>
            </div>
            <div className="navbar-container">



                <NavLink to="/admin" end>
                    <div className="left-navbar-container">
                        <span><FaBookOpen /></span>
                        <div className='name-nav'>Lession</div>
                    </div>
                </NavLink>
                <NavLink to="/admin/dashBoard">
                    <div className="right-navbar-container">
                        <MdDashboard />
                        <div className='name-nav'>Dashboard</div>
                    </div>
                </NavLink>

            </div>
            <div className="user-container">
                <div className="information-user" onClick={() => {
                    handleClickImageUser();
                }}>


                    <div className="name-user">
                        {Auth.auth.user.userName}
                    </div>

                    <div className="avarta-user">
                        {!Auth.auth.user.image ?
                            <img src={avarta} alt="Avarta" />
                            :
                            <img src={ConvertBufferToBase64(Auth.auth.user.image)} alt="Avarta" />

                        }
                    </div>
                </div>
                {Auth.auth.auth &&
                    <div
                        className={`setting poiter ${showSetting && 'rotate30deg'}`}
                        onClick={() => {
                            handleShowSetting();
                        }}
                    >
                        <CiSettings size={'2em'} />

                    </div>}
            </div>
            <ModalLogOut
                show={showLogOut}
                handleClose={handleCloseOut}
            />
            <Setting
                showSetting={showSetting}
                handleClose={handleCloseSetting}
            />
        </>
    )
}

export default HomeHeaderAdmin;