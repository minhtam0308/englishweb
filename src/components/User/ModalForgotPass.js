import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GetAuthUserLimitTime, PostOtpPass } from '../../api/apiUser';
import { toast } from 'react-toastify';



const ModalForgotPass = (props) => {
    const { show, setShow, handleShowModalLofin } = props;
    const [email, setEmail] = useState('');
    const [emailWrong, setEmailWrong] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClose = () => {
        setShow(false);
        handleShowModalLofin();
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setEmailWrong(false);
    }
    const handleEnterEmail = async () => {
        if (validateEmail(email) === null) {
            setEmailWrong(true);
            return;
        }
        const timeLimit = await GetAuthUserLimitTime();
        if (timeLimit.EC === 0) {
            localStorage.setItem("token", timeLimit.token);
            const res = await PostOtpPass(email);
            if (res.EC === 0) {
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }
        }

    }
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 ">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className={`form-control ${emailWrong ? "is-invalid" : ""}`}
                        value={email}
                        onChange={(event) => {
                            handleChangeEmail(event);
                        }}
                    />
                    <div className="invalid-feedback">
                        Please provide a exact your email.
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEnterEmail}>
                    Send OTP
                </Button>
            </Modal.Footer>
        </Modal></>)
}

export default ModalForgotPass;