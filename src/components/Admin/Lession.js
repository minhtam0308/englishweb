import '../../styles/admin.scss';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateLession } from '../../api/apiAdmin';
import { FaFolderPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import Zoom from 'react-medium-image-zoom';
import AListLession from './AListLession';
import GetBase64 from '../../handlerCommon/GetBase64';


const Lession = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('0');
    const [reset, setReset] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTitle("");
        setImage(null);
        setDescription("");
        setLevel('0');

    };
    const handleShow = () => setShow(true);

    const HandleCreateLession = async () => {
        if (!title || !description || !level) {
            toast.warn("you need to enter enought data");

        } else {
            const res = await CreateLession({
                title,
                image,
                description,
                level
            });
            // console.log(res);
            if (res.EC === 0) {
                toast.success(res.EM);
                setReset(!reset);
            } else {
                toast.error("ERROR is not processed");
            }
        }

        handleClose();
    }




    const handlerSetImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            GetBase64(event.target.files[0]).then((res) => setImage(res));
        }


    }
    // console.log("image", image)
    return (
        <>
            <div className='lession-container'>
                <div className='btn-createLession'>
                    <Button className='btn btn-primary' onClick={handleShow}>Add new Lession</Button>
                </div>
                <div className='list-lession'>
                    <AListLession
                        reset={reset}
                        setReset={setReset}
                    />
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LOG IN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="lessio-container">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="formFile"
                                className="form-label btn btn-secondary"
                            >Add Image <FaFolderPlus /></label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                hidden
                                onChange={(event) => {
                                    handlerSetImage(event)
                                }}
                            />
                            <div className='preview'>
                                {!image ?
                                    <span>preview</span>
                                    :
                                    <Zoom><img src={image} alt=""></img></Zoom>

                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label className="form-label">Level</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={level}
                                onChange={(event => setLevel(event.target.value))}
                            >
                                <option value='0'>zero</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={HandleCreateLession}>
                        Add A New Lession
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Lession;