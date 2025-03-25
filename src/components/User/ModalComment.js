
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostComment } from '../../api/apiUser';
import { toast } from 'react-toastify';
const ModalComment = (props) => {
    const { show, setShow } = props
    const [comment, setComment] = useState('');
    const [sendBtn, setSendBtn] = useState(false);

    const handleClose = () => {
        setSendBtn(false);
        setComment('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleEnterConmment = (event) => {
        setComment(event.target.value);
        if (event.target.value !== '') {
            setSendBtn(true);
        } else {
            setSendBtn(false);
        }
    }
    const handleSendComment = async () => {
        if (sendBtn) {
            const res = await PostComment(comment);
            if (res?.EC === 0) {
                toast.success(res.EM);
                handleClose();
            } else {
                toast.error(res.EM);
            }

        }
    }
    return (<>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Write your idea below</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    style={{ "height": "200px", "width": "100%" }}
                    value={comment}
                    onChange={(event) => {
                        handleEnterConmment(event);
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant={`primary ${!sendBtn && "notClick"}`} onClick={() => {
                    handleSendComment()
                }}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default ModalComment