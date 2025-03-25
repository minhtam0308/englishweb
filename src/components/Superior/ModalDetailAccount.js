
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';
import avarta from '../../assets/avatar.png'
import { DelUserAccount, UpUserToTeach } from '../../api/apiSuperior';
import { toast } from 'react-toastify';

const ModalDetailAccount = (props) => {
    const { show, setShow, inforUser, setResetPage, resetpage } = props;
    const [modalDelAcc, setModaldelAcc] = useState(false);
    const [modalUpAcc, setModalUpAcc] = useState(false);

    const handleCloseUpAcc = () => setModalUpAcc(false);

    const handleClose = () => setShow(false);

    const handleCloseAccDel = () => setModaldelAcc(false);
    const handleDelUser = async () => {
        let res = await DelUserAccount(inforUser.id);
        if (res?.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res?.EM);
        }
        handleClose();
        handleCloseAccDel();
        setResetPage(!resetpage);
    }

    const handleUpdateUser = async () => {
        let res = await UpUserToTeach(inforUser.id);
        if (res?.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res?.EM);
        }
        handleClose();
        handleCloseUpAcc();
        setResetPage(!resetpage);
    }

    // console.log(inforUser);
    return (<>
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>User Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="register-container" style={{ "height": "auto", "padding": "50px" }}>


                    <div className="d-flex ">
                        <div className="profile-card">
                            <img
                                src={inforUser?.image ?
                                    ConvertBufferToBase64(inforUser.image)
                                    :
                                    avarta
                                } alt="Profile icon" />
                            <div className="text-center">
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                        <div className="card p-4">

                            <form>
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inforUser?.userName}
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email address"
                                        value={inforUser?.email}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inforUser?.role}
                                        disabled
                                    />
                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {
                    setModaldelAcc(true);
                }}>
                    Delete
                </Button>
                {inforUser?.role === "USER" &&
                    <Button variant="primary" onClick={() => {
                        setModalUpAcc(true);
                    }}>
                        Upto Teacher
                    </Button>
                }

            </Modal.Footer>
        </Modal>

        <Modal show={modalDelAcc} onHide={handleCloseAccDel}>
            <Modal.Header closeButton>
                <Modal.Title>Are You Sure Delete User Has Email "{inforUser?.email}"?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAccDel}>
                    No
                </Button>
                <Button variant="primary" onClick={handleDelUser}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={modalUpAcc} onHide={handleCloseUpAcc}>
            <Modal.Header closeButton>
                <Modal.Title>Are You Sure Update User Has Email "{inforUser?.email}" To Teacher?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpAcc}>
                    No
                </Button>
                <Button variant="primary" onClick={handleUpdateUser}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalDetailAccount;