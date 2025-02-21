
import logo from '../../assets/mochi-logo.webp';

import { GrAssistListening } from "react-icons/gr";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import avarta from '../../assets/avatar.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ContextAuth } from '../../Context/Context';
import { useState } from 'react';

import RModalLoginUser from './RModalLoginUser';
import ModalLogOut from './ModalLogOut';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';

import { CiSettings } from "react-icons/ci";
import ModalChangePass from './ModalChangePass';




const HomeHeader = () => {
    const Auth = useContext(ContextAuth);

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showLogOut, setShowOut] = useState(false);
    const handleCloseOut = () => setShowOut(false);
    const handleShowOut = () => setShowOut(true);

    const [showSetting, setShowSetting] = useState(false);
    const handleCloseSetting = () => setShowSetting(false);
    const handleShowSetting = () => setShowSetting(true);

    const handleClickImageUser = () => {
        if (!Auth.auth.auth) {
            handleShowLogin();
        } else {
            handleShowOut()
        }
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

                {Auth.auth.auth &&
                    <>

                        <NavLink to="">
                            <div className="left-navbar-container">
                                <span><GrAssistListening /></span>
                                <div className='name-nav'>IELTS Listening</div>
                            </div>
                        </NavLink>
                        <NavLink to="/chat">
                            <div className="right-navbar-container">

                                <IoChatboxEllipsesSharp />
                                <div className='name-nav'>Chat</div>
                            </div>
                        </NavLink>
                    </>
                }
            </div>
            <div className="user-container">
                <div className="information-user" onClick={() => {
                    handleClickImageUser();
                }}>

                    {Auth.auth.auth === false ?
                        <div className="name-user">
                            LOGIN
                        </div>
                        :
                        <div className="name-user">
                            {Auth.auth.user.userName}
                        </div>
                    }

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

            <RModalLoginUser
                show={showLogin}
                handleClose={handleCloseLogin}
            />

            <ModalLogOut
                show={showLogOut}
                handleClose={handleCloseOut}
            />
            <ModalChangePass
                showSetting={showSetting}
                handleClose={handleCloseSetting}
            />
        </>
    )
}

export default HomeHeader;