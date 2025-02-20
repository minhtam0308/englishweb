

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PostRegisterUser, PostSendEmailVerify } from "../../api/apiUser";
import { toast } from "react-toastify";
const ModalVerifyEmail = (props) => {

    const { show, handleClose, dataRegister, setDataRegister } = props;

    const handleNoVerify = () => {
        handleClose();
        setDataRegister({});
    }

    const handleYesVerify = async () => {
        const res = await PostRegisterUser(dataRegister);
        if (res.EC === 0) {
            toast.success("Wait for second");
            handleClose();
            const verify = await PostSendEmailVerify(dataRegister.email);
            toast.success(verify.EM);
        } else if (res.EC === 1) {
            toast.warning(res.EM);
        } else if (res.EC === 2) {
            toast.warning(res.EM);
        } else {
            toast.error(res.EM);
        }

    }

    return (<>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to use <b>{dataRegister.email}</b> account for verification?</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleNoVerify()
                }}>
                    NO
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        handleYesVerify()
                    }}
                >
                    YES
                </Button>
            </Modal.Footer>
        </Modal>

    </>)

}

export default ModalVerifyEmail;