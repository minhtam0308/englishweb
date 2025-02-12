import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Buffer } from 'buffer';
import { apiGetAllLession, apiPostDeleteLessById, apiPostUpdateLessById } from '../../api/apiAdmin';
import Zoom from 'react-medium-image-zoom';
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { CiSquareMore } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import GetBase64 from '../../handlerCommon/GetBase64';



const AListLession = (props) => {

    const [listLession, setListLession] = useState([]);


    const [showModalChangeLess, setShowModalChangeLEss] = useState(false);
    const [showModalDeleteLess, setShowModalDeleteLEss] = useState(false);
    const [dataDel, setDataDel] = useState();



    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('0');
    const [id, setId] = useState('');



    useEffect(() => {
        //fix React Hook useEffect has a missing dependency: 'getListLession'. Either include it or remove the dependency array
        const getListLession = async () => {
            const res = await apiGetAllLession();

            if (res) {
                setListLession(ConvertBufferToBase64(res.data));
            }
        }

        getListLession();
    }, [props.reset])

    // convert from buffer to base64
    // const base64Data = Buffer.from(bufferDataGoesHere).toString("base64"); sai sai sai
    // Buffer.from(base64encoded, 'base64').toString('utf8');
    const ConvertBufferToBase64 = (listLess) => {
        if (listLess.length > 0) {
            let res = listLess.map((value, index) => {
                if (value.image) {
                    value.image = Buffer.from(value.image, 'base64').toString('utf8');

                }
                return value;
            })
            return res;
        }

    }

    const handleShowModalChangeLession = () => setShowModalChangeLEss(true);


    const handleCloseModalChangeLession = () => {
        setShowModalChangeLEss(false);
    };

    const handlerFixLession = (val) => {
        setId(val.id);
        setTitle(val.title);
        setLevel(val.level);
        setImage(val.image);
        setDescription(val.description);
        handleShowModalChangeLession();


    }



    const handlerSetImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            GetBase64(event.target.files[0]).then((res) => setImage(res));
        }


    }

    const handlerChangeLess = async () => {
        //because level =0 so !level = 1
        if (!title || !description || level === null || !id) {
            toast.warning("Need To Write Enough Data");
        } else {
            const res = await apiPostUpdateLessById(id, title, description, image, level);
            if (res.EC === 0) {
                toast.success(res.EM);
                props.setReset(!props.reset);
                handleCloseModalChangeLession();
            } else {
                toast.error(res.EM);
            }
        }

    }

    const handlerDeleteLess = (val) => {
        setDataDel(val);
        setShowModalDeleteLEss(true);
    }
    const handleCloseModalDeleteLession = () => {
        setShowModalDeleteLEss(false);
        setDataDel('');
    }

    const handlderSureDelete = async (val) => {

        const res = await apiPostDeleteLessById(val.id);
        if (res.EC === 0) {
            toast.success(res.EM);
            props.setReset(!props.reset);;
        } else {
            toast.error(res.EM);
        }
        handleCloseModalDeleteLession();
    }

    return (
        <>


            <Table striped bordered hover>
                <thead className="table-info">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listLession && listLession.length > 0 && listLession.map((val, index) => {
                        // console.log(val.image)
                        return (
                            <tr key={`lesslist${index}`} className='listLession-td'>
                                <td>{val.id}</td>
                                <td>{val.title}</td>
                                <td className='image'>
                                    {val.image ?
                                        <Zoom>
                                            <img src={val.image} alt='not have img' />
                                        </Zoom>

                                        :
                                        <p>preview</p>}
                                </td>
                                <td>{val.description}</td>
                                <td>{val.level}</td>
                                <td>
                                    <div className='setbtn'>
                                        <button className='btn btn-info mx-1'
                                            onClick={() => {
                                                handlerFixLession(val);
                                            }}
                                        ><FaPencilAlt
                                                color={'orange'}
                                                size={'1.5em'}
                                            /></button>
                                        <button className='btn btn-info mx-1'
                                            onClick={() => {
                                                handlerDeleteLess(val);
                                            }}
                                        ><ImBin2
                                                color={'red'}
                                                size={'1.5em'}
                                            /></button>
                                        <NavLink to={'/admin/CRUDQuestion'}
                                            state={{ val }}

                                        >
                                            <button className='btn btn-info mx-1'><CiSquareMore /></button>

                                        </NavLink>
                                    </div>

                                </td>
                            </tr>)

                    })}

                </tbody>
            </Table>
            {/* modal update lession  */}
            <Modal show={showModalChangeLess} onHide={handleCloseModalChangeLession}>
                <Modal.Header closeButton>
                    <Modal.Title>FIX INFORMATION LESSION</Modal.Title>
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
                            >Change Image </label>
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
                    <Button variant="secondary" onClick={handleCloseModalChangeLession}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handlerChangeLess() }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal confirm delete  */}
            {dataDel &&
                <Modal show={showModalDeleteLess} onHide={handleCloseModalDeleteLession}>
                    <Modal.Header closeButton>
                        <Modal.Title>ARE YOU SURE DELETE THIS LESSION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="lessio-container">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dataDel.title}
                                    disabled
                                />
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
                                    disabled
                                />
                                <div className='preview'>
                                    {!dataDel.image ?
                                        <span>preview</span>
                                        :
                                        <Zoom><img src={dataDel.image} alt=""></img></Zoom>

                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={dataDel.description}
                                    disabled

                                ></textarea>
                            </div>
                            <div>
                                <label className="form-label">Level</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={dataDel.level}
                                    disabled

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
                        <Button variant="secondary" onClick={handleCloseModalDeleteLession}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => { handlderSureDelete(dataDel) }}>
                            SURE
                        </Button>
                    </Modal.Footer>
                </Modal>}
        </>
    );
}

export default AListLession;