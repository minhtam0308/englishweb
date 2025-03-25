
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DelComment } from '../../api/apiSuperior';
import { toast } from 'react-toastify';

const ModalDelComment = (props) => {
    const { show, setShow, commentDel, setCommentDel, resetPage, setResetPage } = props;
    const handleClose = () => {
        setShow(false);
        setCommentDel(null);
    }
    const handleDelComment = async () => {
        const res = await DelComment(commentDel.id);
        if (res?.EC === 0) {
            toast.success(res.EM);
            setResetPage(!resetPage);
        } else {
            toast.error(res?.EM);

        }
        handleClose();

    }
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure Delete This Comment?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {commentDel?.comment}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelComment}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDelComment;