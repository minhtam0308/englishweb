
import logo from '../../assets/mochi-logo.webp';

import { GrAssistListening } from "react-icons/gr";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import avarta from '../../assets/avatar.png';
import { NavLink } from 'react-router-dom';


const HomeHeader = (props) => {


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

            </div>
            <div className="user-container">
                <div className="information-user" onClick={props.handleShow}>
                    <div className="name-user">
                        GUEST
                    </div>
                    <div className="avarta-user">
                        <img src={avarta} alt="Avarta" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeHeader;