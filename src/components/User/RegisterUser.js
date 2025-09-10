import { useState } from "react";
import { Button } from "react-bootstrap";
import logo from '../../assets/mochi-logo.webp';
import GetBase64 from "../../handlerCommon/GetBase64";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import RModalLoginUser from './RModalLoginUser';
import HomeHeader from "./HomeHeader";
import ModalVerifyEmail from "./ModalVerifyEmail";



const RegisterUser = () => {

    const [userName, setUserName] = useState("");
    const [UserNameNull, setUserNameNull] = useState(false);
    const [email, setEmail] = useState("");
    const [emailWrong, setEmailWrong] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [passwordAgain, setPasswordAgain] = useState("");
    const [passwordAgainInvalid, setPasswordAgainInvalid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [image, setImage] = useState(null);

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showModalVerify, setShowModalVerify] = useState(false);
    const handleCloseVerify = () => setShowModalVerify(false);
    const handleShowVerify = () => setShowModalVerify(true);

    const [dataRegister, setDataRegister] = useState({});

    const handleChangUserName = (event) => {
        if (event.target.value !== "") {
            setUserNameNull(false);
        }
        setUserName(event.target.value);
    }
    const handleChangEmail = (event) => {
        setEmail(event.target.value);
        setEmailWrong(false);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setPasswordInvalid(false);
    }
    const handleChangePasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
        if (password === event.target.value) {
            setPasswordAgainInvalid(false);
        }
    }

    const handleChangImage = async (event) => {
        if (event.target.files[0]) {
            await GetBase64(event.target.files[0]).then((res) => setImage(res));

        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async () => {

        if (userName === '') {
            setUserNameNull(true);
            return;
        }
        if (validateEmail(email) === null) {
            setEmailWrong(true);
            return;
        }
        if (password === '' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password)) {
            setPasswordInvalid(true);
            return;
        }
        if (password !== passwordAgain) {
            setPasswordAgainInvalid(true);
            return;
        }
        setDataRegister({
            userName: userName,
            role: "USER",
            email: email,
            password: password,
            image: image
        });
        setUserName('');
        setEmail('');
        setImage(null);
        setPassword('');
        setPasswordAgain('');
        handleShowVerify();
        return;


    }
    // console.log(image)
    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <HomeHeader
                        handleShow={handleShowLogin}
                    />
                </div>
                <div className="register-container">
                    <div className="d-flex ">
                        <div className="profile-card">
                            {image ?
                                <img src={image} alt="Profile icon" />
                                :
                                <img src={logo} alt="LOGO" className="imageUser" />


                            }
                            <div className="text-center">
                                <p></p>
                                <p></p>
                            </div>
                            <input
                                type="file"
                                id="imageUser"
                                hidden
                                onChange={(event) => {
                                    handleChangImage(event);
                                }}
                            />
                            <label className="btn btn-primary"
                                htmlFor="imageUser"
                            >Change Image</label>
                        </div>
                        <div className="card p-4">
                            <h3 className="mb-4">User Registration</h3>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${UserNameNull ? "is-invalid" : ""}`}
                                        placeholder="User Name"
                                        value={userName}
                                        onChange={(event) => {
                                            handleChangUserName(event);
                                        }}
                                    />
                                    <div className="invalid-feedback">
                                        Please provide your name.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${emailWrong ? "is-invalid" : ""}`}
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(event) => {
                                            handleChangEmail(event);
                                        }}

                                    />
                                    <div className="invalid-feedback">
                                        Please provide a exact your email.
                                    </div>
                                </div>

                                <div className="mb-3 password_container">
                                    <label className="form-label">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${passwordInvalid ? "is-invalid" : ""}`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => {
                                            handleChangePassword(event);
                                        }}
                                    />
                                    <span
                                        className="eye_showPass poiter"
                                        onClick={() => setShowPassword(!showPassword)}

                                    >
                                        {!showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}


                                    </span>
                                    <div className="invalid-feedback">
                                        Your password is invalid
                                    </div>
                                </div>
                                <div className="mb-3 password_container">
                                    <label className="form-label">Password Again</label>
                                    <input
                                        type={showPasswordAgain ? 'text' : 'password'}
                                        className={`form-control ${passwordAgainInvalid ? "is-invalid" : ""}`}
                                        placeholder="Password"
                                        value={passwordAgain}
                                        onChange={(event) => {
                                            handleChangePasswordAgain(event);
                                        }}
                                    />
                                    <span
                                        className="eye_showPass poiter"
                                        onClick={() => setShowPasswordAgain(!showPasswordAgain)}

                                    >
                                        {!showPasswordAgain ? <RiEyeCloseLine /> : <RiEyeLine />}
                                    </span>
                                    <div className="invalid-feedback">
                                        Password is not the same as above password .
                                    </div>
                                </div>
                                <Button
                                    className="mx-3 px-3 right"
                                    onClick={() => {
                                        handleSubmit();
                                    }}
                                >Register</Button>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <RModalLoginUser
                show={showLogin}
                handleClose={handleCloseLogin}
            />

            <ModalVerifyEmail
                show={showModalVerify}
                handleClose={handleCloseVerify}
                dataRegister={dataRegister}
                setDataRegister={setDataRegister}
            />
        </>
    )
}

export default RegisterUser;