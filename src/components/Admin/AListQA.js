import { useEffect, useState } from "react";
import { apiGetAllQA, apiPostDeleteQuesById } from "../../api/apiAdmin";
import { toast } from "react-toastify";
import Zoom from 'react-medium-image-zoom';
import { Table } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import AModalUpdateQA from "./AModalUpdateQA";
import ConvertBufferToBase64 from "../../handlerCommon/ConvertBufferToBase64";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AListQA = (props) => {

    const { id } = props;
    const [dataQA, setDataQA] = useState();
    const [refresh, setRefresh] = useState(false);
    const [quesUpdate, setQuesUpdate] = useState({ "cap": "nhat" });
    const [showModalUpdateQues, setShowModalUpdateQues] = useState(false);

    const [showConfirmDelete, setShowModalConfirmDelete] = useState(false);
    const [idQuesDel, setIdQuesDel] = useState(null);
    const [indexQuesDel, setIndexQuesDel] = useState(null);
    const handleClose = () => setShowModalConfirmDelete(false);
    const handleShow = () => setShowModalConfirmDelete(true);

    useEffect(() => {
        const listQA = async (id) => {
            if (id) {
                let res = await apiGetAllQA(id);

                setDataQA(res);
                // console.log(res)
                if (res.EC !== 0) {
                    toast.error(res.EM);
                }
            }

        }

        listQA(id);
    }, [refresh, props.clickSave, id])




    const HandlerDeleteQues = async (id, index) => {
        handleShow();
        setIndexQuesDel(index + 1);
        setIdQuesDel(id);
        return;

    }

    const handlerUpdateQues = (val) => {
        // console.log(val.image)
        setQuesUpdate(val);
        setShowModalUpdateQues(true);
    }

    const handleConfirmDelete = async () => {
        await apiPostDeleteQuesById(idQuesDel);
        setIdQuesDel(null);
        handleClose();
        setRefresh(!refresh);

    }
    // console.log("update", quesUpdate);
    // console.log("data", dataQA);
    return (
        <>

            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Information</th>
                        <th>Actiton</th>

                    </tr>
                </thead>
                <tbody>
                    {dataQA && dataQA.data && dataQA.data.length > 0 && dataQA.data.map((val, index) => {
                        // console.log(val)
                        return <tr key={`ques${index}`}>
                            <td>

                                <div className="list-qa">
                                    <div className="mb-3">
                                        <label className="form-label">Question: {index + 1}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={val.cont}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">



                                        {val.image &&
                                            <div className='preview'>
                                                <Zoom><img src={ConvertBufferToBase64(val.image)} alt=""></img></Zoom>
                                            </div>
                                        }

                                    </div>

                                    {val.ans && val.ans.map((valAns, indexAns) => {
                                        // console.log("val", val, "index", index) 

                                        return (

                                            <div className='mb-3' key={`ansInAddAns ${indexAns}`}>
                                                <div className='add-ans'>
                                                    <input type="checkbox"
                                                        checked={valAns.is_true}
                                                        disabled
                                                    />
                                                    <div className='col-8'>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={valAns.description}
                                                            disabled
                                                        />
                                                    </div>

                                                </div>
                                            </div>)

                                    })
                                        // console.log("index ", index, "val ", val)

                                    }


                                </div>
                            </td>
                            <td className="btn-container">
                                <div>
                                    <button className='btn btn-info mx-1'
                                    ><FaPencilAlt
                                            color={'orange'}
                                            size={'1.5em'}
                                            onClick={() => {
                                                handlerUpdateQues(val)
                                            }}
                                        /></button>
                                    <button className='btn btn-info mx-1'

                                    ><ImBin2
                                            color={'red'}
                                            size={'1.5em'}
                                            onClick={() => {
                                                HandlerDeleteQues(val.id, index)
                                            }}
                                        /></button>
                                </div>
                            </td>

                        </tr>
                    })}

                </tbody>
            </Table>

            <AModalUpdateQA
                setRefresh={setRefresh}
                refresh={refresh}
                quesUpdate={quesUpdate}
                setQuesUpdate={setQuesUpdate}
                show={showModalUpdateQues}
                setShow={setShowModalUpdateQues}
            />

            {/* Modal consfirm delete Question */}
            <Modal show={showConfirmDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure Delete Question {indexQuesDel} ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
export default AListQA;