
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
const ModalLogOut = (props) => {
    const { show, handleClose } = props;
    const [showModalLogOut, setShowModalLogOut] = useState(false);
    const handleCloseShowModal = () => {
        setShowModalLogOut(false);
    }

    const handleClickLogOut = () => {
        setShowModalLogOut(true);
        handleClose();
    }

    const handleAcceptLogOut = () => {
        setShowModalLogOut(true);
        handleClose();
        localStorage.removeItem('token');
        window.location.reload();

    }
    return (<>
        {show &&
            <>
                <div className='closelogOut' onClick={() => {
                    handleClose();
                }}></div>
                <div className='logOut-container'>
                    <div className='accept-logOut' onClick={
                        handleClickLogOut
                    }>
                        LOG OUT
                    </div>
                </div>

            </>
        }
        <Modal show={showModalLogOut} onHide={handleCloseShowModal}>
            <Modal.Header closeButton>
                <Modal.Title>ARE YOU SURE LOGOUT</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseShowModal}>
                    NO
                </Button>
                <Button
                    variant="danger"
                    onClick={handleAcceptLogOut}
                >
                    YES
                </Button>
            </Modal.Footer>
        </Modal>

    </>)

}
export default ModalLogOut;