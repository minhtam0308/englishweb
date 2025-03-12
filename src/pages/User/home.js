
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/home.css';
import HomeHeader from '../../components/User/HomeHeader';
import HomeLeftContent from '../../components/User/HomeLeftContent';
import HomeRightContent from '../../components/User/HomeRightContent';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';


const Home = (props) => {

    // console.log(localStorage)
    useEffect(() => {
        props.ControlAudio("stop");
    })


    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <HomeHeader />
                </div>
                <div className="content-container">
                    <div className="content-left-container">
                        <HomeLeftContent />
                    </div>

                    <div className="content-center-container">
                        <Outlet />
                    </div>

                    <div className="content-right-cotainer px-5">

                        <HomeRightContent />
                    </div>
                </div>

            </div>



        </>
    )
}
export default Home;