
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Zoom from 'react-medium-image-zoom';
import { useEffect, useState } from 'react';

import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { apiPostUpdateQuestion } from '../../api/apiAdmin';
import GetBase64 from '../../handlerCommon/GetBase64';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';


const AModalUpdateQA = (props) => {

    const { quesUpdate, show, setShow, setQuesUpdate, setRefresh, refresh } = props;
    //khong thay doi useState khi useSate cha thay doi
    // const [ques, setQues] = useState({})

    const [checkQues, setCheckQues] = useState(true);
    const [idAns, setIdAns] = useState(0);

    const [arrDelete, setArrDelete] = useState([]);


    useEffect(() => {
        setArrDelete([]);
        let temp = structuredClone(quesUpdate);
        temp.image = ConvertBufferToBase64(quesUpdate.image);
        setQuesUpdate(temp);
    }, [show])



    const handleCloseModal = () => {
        setShow(false);
    }
    const handlerChangeQues = (event) => {
        let temp = structuredClone(quesUpdate);
        temp.cont = event.target.value;
        setQuesUpdate(temp)

        if (event.target.value === "") {
            setCheckQues(false);
            validateQues();
        } else {
            setCheckQues(true);
        }


    }



    const handlerChangeImg = async (event) => {
        let tmp = structuredClone(quesUpdate);
        await GetBase64(event.target.files[0]).then((res) => tmp.image = res);
        setQuesUpdate(tmp);
    }


    //check enough question
    const validateQues = () => {
        setCheckQues(false);
        toast.error("Write Your Question Before")
    }

    const handlerAddAns = () => {
        if (quesUpdate.cont !== "") {
            let temp = structuredClone(quesUpdate);
            temp.ans.push({
                id: idAns,
                description: "",
                is_true: false,
                id_question: quesUpdate.id
            })
            setQuesUpdate(temp);
            setIdAns(idAns - 1);
        } else {
            validateQues();
        }

    }

    const handlerChangeCorrAns = (res, id) => {
        let ansTemp = quesUpdate.ans.map((val) => {
            if (val.id === id) {
                val.is_true = res;
            }
            return val;
        })
        let temp = structuredClone(quesUpdate);
        temp.ans = ansTemp;
        setQuesUpdate(temp);
    }

    const handlerChangAns = (event, id) => {
        // console.log(id)
        if (quesUpdate.cont !== "") {

            let Anstmp = quesUpdate.ans.map((val) => {
                if (val.id === id) {
                    val.description = event.target.value;
                    // console.log(event.target.value)
                }

                return val;
            });
            let temp = structuredClone(quesUpdate);
            temp.ans = Anstmp;
            // console.log(Anstmp)
            setQuesUpdate(temp);

        } else {
            validateQues()
        }
    }

    const handlerDeleteAns = (id) => {
        let AnsTemp = quesUpdate.ans.filter((val) => {
            if (val.id !== id) {
                return true;
            }
            return false;
        })
        let temp = structuredClone(quesUpdate);
        temp.ans = AnsTemp;
        // console.log(AnsTemp)
        setQuesUpdate(temp);
        let deleTemp = structuredClone(arrDelete);
        deleTemp.push(id);
        setArrDelete(deleTemp);

    }

    const handleSaveUpdate = async () => {

        if (quesUpdate.cont === "") {
            validateQues();
            return;
        }
        let ansEmpty = quesUpdate.ans.findIndex((val) => {
            return val.description === "";
        })
        let ansNoCorr = quesUpdate.ans.findIndex((val) => {
            return val.is_true === 1 || val.is_true === true
        })

        if (ansEmpty !== -1) {
            toast.warning(`Your Answer ${ansEmpty + 1} Is Empty`);
            return;
        }
        if (ansNoCorr === -1) {
            toast.warning(`Have No Correct Answer In Your Question`);
            return;
        }


        // console.log("ques", quesUpdate);
        // console.log("arrr", arrDelete);

        let res = await apiPostUpdateQuestion(arrDelete, quesUpdate);
        // console.log(res);

        if (res.EC === 0) {
            toast.success(res.EM);
            setRefresh(!refresh);
            handleCloseModal();
        } else {
            toast.error(res.EM);
        }

    }

    // console.log(arrDelete)
    // console.log("ques", quesUpdate)


    // console.log(quesUpdate.image)
    return (
        <>
            {quesUpdate &&
                <Modal show={show} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label">Question: </label>
                            <input
                                type="text"
                                className={checkQues ? `form-control` : `form-control is-invalid`}
                                placeholder="Write Your Question"
                                value={quesUpdate.cont}
                                onChange={(event) => {
                                    handlerChangeQues(event);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="formFile"
                                className="form-label btn btn-secondary"
                            >Add Image </label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                hidden
                                onChange={(event) => {
                                    handlerChangeImg(event)
                                }}
                            />
                            <div className='preview'>
                                {!quesUpdate.image ?
                                    <span>preview</span>
                                    :
                                    <Zoom><img src={(quesUpdate.image)} alt=""></img></Zoom>
                                }
                            </div>
                        </div>

                        {quesUpdate.ans && quesUpdate.ans.map((val, index) => {
                            // console.log("val", val, "index", index) 

                            return (

                                <div className='mb-3' key={`ansInAddAns ${index}`}>
                                    <div className='add-ans'>
                                        <input type="checkbox"
                                            checked={val.is_true}
                                            onChange={(event) => {
                                                handlerChangeCorrAns(event.target.checked, val.id)
                                            }}
                                        />
                                        <div className='col-8'>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={`Write Your Answer ${index + 1}`}
                                                value={val.description}
                                                onChange={(event) => {
                                                    handlerChangAns(event, val.id);
                                                }}
                                            />
                                        </div>
                                        <span>
                                            {quesUpdate.ans && quesUpdate.ans.length > 1 && <FaMinusSquare
                                                size={'2em'}
                                                color='red'
                                                cursor={`pointer`}

                                                onClick={() => {
                                                    handlerDeleteAns(val.id)
                                                }}
                                            />}
                                            {quesUpdate.ans && index === quesUpdate.ans.length - 1 && <FaPlusSquare
                                                size={'2em'}
                                                cursor={`pointer`}
                                                color='green'
                                                onClick={handlerAddAns}
                                            />}
                                        </span>
                                    </div>
                                </div>)

                        })
                            // console.log("index ", index, "val ", val)

                        }


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={
                            () => {
                                handleCloseModal()
                            }
                        }>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={() => {
                                handleSaveUpdate()
                            }}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default AModalUpdateQA;