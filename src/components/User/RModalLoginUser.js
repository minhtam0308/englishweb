
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { PostLoginUser } from '../../api/apiUser';
import { useNavigate } from 'react-router-dom';

const ModalLoginUser = (props) => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()


    const { show, handleClose } = props;


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogIn = async () => {
        if (email === "" || password === "") {
            toast.warning("Write Your Email And Password");
            return;
        }
        const res = await PostLoginUser({
            email: email,
            password: password
        })
        if (res?.EC === 0) {
            localStorage.setItem("token", res.token)
            if (res.role === "ADMIN") {
                navigate('/admin');
                window.location.reload();
            } else if (res.role === "USER") {
                navigate('/');
                window.location.reload();
            } else if (res.role === "SUPERIOR") {
                navigate('/superior');
                window.location.reload();
            }
            handleClose();

        } else {
            toast.error(res?.EM);
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