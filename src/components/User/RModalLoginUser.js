
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalLoginUser = (props) => {

    const { show, handleClose } = props;
    return (
        <>
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
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLoginUser; 