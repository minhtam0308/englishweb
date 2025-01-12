
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/home.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import HomeHeader from '../../components/User/HomeHeader';
import HomeLeftContent from '../../components/User/HomeLeftContent';
import HomeRightContent from '../../components/User/HomeRightContent';
import { Outlet } from 'react-router-dom';


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
                    <div className="content-center-container">
                        <Outlet />
                    </div>
                    <div className="content-right-cotainer">

                        <HomeRightContent />
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LOG IN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Home;