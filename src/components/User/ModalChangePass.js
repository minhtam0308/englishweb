import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { PutChangePassword } from "../../api/apiUser";

const ModalChangePass = (props) => {
    const { showSetting, handleClose } = props;
    const [showModalChangePass, setShowModalChangePass] = useState(false);
    const [noChangePass, setNoChangePass] = useState(true);

    const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
    const [passwordCurrent, setPasswordCurrent] = useState('');

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [passwordNew, setPasswordNew] = useState('');

    const [passWrong, setPassWrong] = useState(false);
    const [newPassWrong, setNewPassWrong] = useState(false);

    const [showPasswordNewAgain, setShowPasswordNewAgain] = useState(false);
    const [passwordNewAgain, setPasswordNewAgain] = useState('');




    const handleShowChangePass = () => {
        setShowModalChangePass(true);
        handleClose();
    }

    const handleCloseSetting = () => {
        handleClose();
        setPassWrong(false);
        setNewPassWrong(false);
        setShowModalChangePass(false);
        setPasswordCurrent('');
        setPasswordNew('');
        setPasswordNewAgain('');
    }

    const handleYesChangePass = async () => {
        if (passwordNew !== passwordNewAgain) {
            setNewPassWrong(true);
            return;
        }
        if (passwordCurrent === passwordNew) {
            toast.warning("The New Password Cannot Is The Same As The Old Password");
            return;
        }
        let res = await PutChangePassword(passwordCurrent, passwordNew);
        if (res?.EC === 2) {
            toast.error(res.EM);
        } else if (res?.EC === 0) {
            toast.success(res.EM);
        }
    }
    // console.log("pasCurr", passwordCurrent);
    // console.log("pasNew", passwordNew);

    // console.log("pasAgain", passwordNewAgain);

    return (<>
        {showSetting &&
            <>
                <div className='closeSetting' onClick={() => {
                    handleClose();
                }}></div>

                <div className='setting-container'>
                    <div
                        className='accept-setting'
                        onClick={() => {
                            handleShowChangePass()
                        }}
                    >
                        Change PassWord
                    </div>
                </div>

            </>
        }
        <Modal show={showModalChangePass} onHide={handleCloseSetting}>
            <Modal.Header closeButton>
                <Modal.Title>Change Your PassWord</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="mb-3 password_container">
                    <label className="form-label">Password Current: </label>

                    <input
                        type={showPasswordCurrent ? 'text' : 'password'}
                        className={`form-control ${passWrong && 'is-invalid'}`}
                        value={passwordCurrent}
                        onChange={(event) => {
                            setPasswordCurrent(event.target.value);
                            if (event.target.value && passwordNew && passwordNewAgain) {
                                setNoChangePass(false);
                            } else {
                                setNoChangePass(true);

                            }
                        }}
                    />
                    <div className="invalid-feedback">
                        PassWord is not correct.
                    </div>
                    <span
                        className="poiter eye_showPass"
                        onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                    >
                        {!showPasswordCurrent ? <RiEyeCloseLine /> : <RiEyeLine />}


                    </span>
                </div>
                <div className="mb-3 password_container">
                    <label className="form-label">New PassWord: </label>

                    <input type={showPasswordNew ? 'text' : 'password'}
                        className="form-control"
                        value={passwordNew}
                        onChange={(event) => {
                            setPasswordNew(event.target.value);
                            setNewPassWrong(false);
                            if (event.target.value && passwordNewAgain && passwordCurrent) {
                                setNoChangePass(false);
                            } else {
                                setNoChangePass(true);

                            }
                        }}
                    />
                    <span
                        className="poiter eye_showPass"
                        onClick={() => setShowPasswordNew(!showPasswordNew)}

                    >
                        {!showPasswordNew ? <RiEyeCloseLine /> : <RiEyeLine />}


                    </span>
                </div>
                <div className="mb-3 password_container">
                    <label className="form-label">New Password Again: </label>

                    <input type={showPasswordNewAgain ? 'text' : 'password'}
                        className={`form-control ${newPassWrong && 'is-invalid'}`}
                        value={passwordNewAgain}
                        onChange={(event) => {
                            setPasswordNewAgain(event.target.value);
                            setNewPassWrong(false);
                            if (event.target.value && passwordNew && passwordCurrent) {
                                setNoChangePass(false);
                            } else {
                                setNoChangePass(true);

                            }
                        }}
                    />
                    <div className="invalid-feedback">
                        The new passwords are not the same.
                    </div>
                    <span
                        className="poiter eye_showPass"
                        onClick={() => setShowPasswordNewAgain(!showPasswordNewAgain)}

                    >
                        {!showPasswordNewAgain ? <RiEyeCloseLine /> : <RiEyeLine />}


                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleCloseSetting()
                }}>
                    NO
                </Button>
                <Button
                    variant="danger"
                    className={`${noChangePass ? 'notClick' : ''}`}
                    onClick={handleYesChangePass}
                >
                    YES
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}
export default ModalChangePass;