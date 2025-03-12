import { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { PutChangePassword, PutUpdateUser } from "../../api/apiUser";
import GetBase64 from "../../handlerCommon/GetBase64";
import Zoom from 'react-medium-image-zoom';
import avatar from '../../assets/avatar.png'
import { ContextAuth } from "../../Context/Context";
import ConvertBufferToBase64 from "../../handlerCommon/ConvertBufferToBase64";


const Setting = (props) => {
    const { showSetting, handleClose } = props;
    const Auth = useContext(ContextAuth);

    useEffect(() => {
        setNameUpdate(Auth.auth?.user?.userName);
        if (Auth.auth?.user?.image?.data.length > 0) {
            setImageUpdate(ConvertBufferToBase64(Auth.auth.user.image));
        } else {
            setImageUpdate(null);
        }
    }, [Auth])

    //Change Pass
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


    //Update User
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [nameUpdate, setNameUpdate] = useState();
    const [imageUpdate, setImageUpdate] = useState(null);


    //Change Pass
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
        setNoChangePass(true);
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


    //Change User Information
    // console.log(Auth.auth)
    const handleCloseModalUpdateUSer = () => {
        setShowModalUpdateUser(false);
        handleClose();
        setNameUpdate(Auth.auth?.user?.userName);
        if (Auth.auth?.user?.image?.data.length > 0) {
            setImageUpdate(ConvertBufferToBase64(Auth.auth.user.image));
        } else {
            setImageUpdate(null);
        }
    };
    const handleShowModalUpdateUSer = () => {
        setShowModalUpdateUser(true)
        handleClose();
    };
    const UpdateUser = () => {
        handleShowModalUpdateUSer();
    }

    const handlerChangeImgUpdate = (event) => {
        GetBase64(event.target.files[0]).then(res => setImageUpdate(res));
    }

    const handleSaveUpdate = async () => {
        if (nameUpdate === '') {
            toast.warning("Enter Your Name");
        } else {

            const res = await PutUpdateUser(nameUpdate, imageUpdate);
            if (res.EC === 0) {
                toast.success(res.EM);
                handleCloseModalUpdateUSer();
                window.location.reload();
            } else {
                toast.error(res.EM);
            }
        }

    }
    // console.log(imageUpdate)
    // console.log(nameUpdate);
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
                    <div
                        className='accept-setting'
                        onClick={() => {
                            UpdateUser();
                        }}
                    >
                        Change Your Information
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
                    onClick={() => {
                        if (!noChangePass) {
                            handleYesChangePass();
                        }
                    }}
                >
                    YES
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Update USer */}
        <Modal show={showModalUpdateUser} onHide={handleCloseModalUpdateUSer} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Your Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Your Name: </label>
                    <div className="col-sm-10">
                        <input type="text"
                            className="form-control"
                            value={nameUpdate}
                            onChange={(event) => setNameUpdate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="formFile"
                        className="form-label btn btn-secondary"
                    >Change Image </label>
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        hidden
                        onChange={(event) => {
                            handlerChangeImgUpdate(event)
                        }}
                    />
                    <div className='preview'>
                        {imageUpdate ?
                            <Zoom><img src={imageUpdate} alt=""></img></Zoom>
                            :
                            <Zoom><img src={avatar} alt=""></img></Zoom>
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalUpdateUSer}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveUpdate}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}
export default Setting;