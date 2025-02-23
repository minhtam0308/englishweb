import { Outlet } from 'react-router-dom';
import HomeHeaderAdmin from '../../components/Admin/HomeHeaderAdmin';

const HomeAdmin = () => {
    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <HomeHeaderAdmin />
                </div>
                <div className="content">
                    <Outlet />

                </div>

            </div>



        </>)
}

export default HomeAdmin;