
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { toast } from 'react-toastify';

const ModalLoginUser = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const { show, handleClose } = props;


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogIn = () => {
        if (email === "" || password === "") {
            toast.warning("Write Your Email And Password");
            return;
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LOG IN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 ">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(event) => {
                                handleChangeEmail(event);
                            }}
                        />
                    </div>
                    <div className="mb-3 password_container">
                        <label className="form-label">Password</label>
                        <input
                            type={!showPassword ? "password" : "text"}
                            className="form-control"
                            value={password}
                            onChange={(event) => {
                                handleChangePassword(event);
                            }}
                        />
                        <span
                            className="poiter eye_showPass"
                            onClick={() => setShowPassword(!showPassword)}

                        >
                            {!showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}


                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogIn}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLoginUser; 