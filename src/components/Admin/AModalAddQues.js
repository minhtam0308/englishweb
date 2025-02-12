
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";

import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { toast } from 'react-toastify';
import { apiPostCreateQuestion } from '../../api/apiAdmin';
import GetBase64 from '../../handlerCommon/GetBase64';

const AModalAddQues = (props) => {

    const { show, handleClose } = props;
    const [ques, setQues] = useState({
        cont: "",
        image: null,
    });
    const [ans, setAns] = useState([{
        id: 0,
        cont: "",
        is_true: false
    }]);
    const [checkQues, setCheckQues] = useState(true);
    const [idAns, setIdAns] = useState(1);

    const handlerChangeQues = (event) => {
        setCheckQues(true);
        let tmp = structuredClone(ques);
        tmp.cont = event.target.value;
        setQues(tmp)
    }



    const handlerChangeImg = async (event) => {
        if (event.target.files[0]) {
            let tmp = structuredClone(ques);
            await GetBase64(event.target.files[0]).then((res) => tmp.image = res);
            setQues(tmp);
        }

    }
    // console.log(ques)

    const HandlerDeleteImg = () => {
        setQues({
            cont: "",
            image: null,
        })
        setAns([{
            id: 0,
            cont: "",
            is_true: false
        }])
    }


    //check enough question
    const validateQues = () => {
        setCheckQues(false);
        toast.error("Write Your Question Before")
    }

    const handlerChangAns = (event, id) => {
        if (ques.cont !== "") {

            let tmp = ans.map((val) => {
                if (val.id === id) {
                    val.cont = event.target.value;
                }
                return val;
            });
            setAns(tmp)
        } else {
            validateQues()
        }
    }

    const handlerAddAns = () => {
        if (ques.cont !== "") {
            let temp = structuredClone(ans);
            temp.push({
                id: idAns,
                cont: "",
                is_true: false
            })
            setAns(temp);
            setIdAns(idAns + 1);
        } else {
            validateQues()
        }

    }

    const handlerDeleteAns = (id) => {
        let temp = ans.filter((val) => {
            if (val.id !== id) {
                return true;
            }
            return false;
        })
        setAns(temp);
    }

    const handlerChangeCorrAns = (res, id) => {
        let temp = ans.map((val) => {
            if (val.id === id) {
                val.is_true = res;
            }
            return val;
        })
        setAns(temp)
    }

    const handleSaveQues = async () => {

        if (ques.cont === "") {
            validateQues();
            return;
        }
        let ansEmpty = ans.findIndex((val) => {
            return val.cont === "";
        })
        let ansNoCorr = ans.findIndex((val) => {
            return val.is_true === true;
        })

        if (ansEmpty !== -1) {
            toast.warning(`Your Answer ${ansEmpty + 1} Is Empty`);
            return;
        }
        if (ansNoCorr === -1) {
            toast.warning(`Have No Correct Answer In Your Question`);
            return;
        }

        const res = await apiPostCreateQuestion(ques, ans, props.idLession);
        if (res.EC === 0) {
            toast.success(res.EM);
            props.setClickSave(!props.clickSave);
        } else if (res.EC === 1) {
            toast.error(res.EM);
        } else {
            toast.error("ERROR NOT PROCESSED")
        }
        HandlerDeleteImg()
        handleClose()
    }
    // console.log(ans)
    // console.log(ques)

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Question: </label>
                        <input
                            type="text"
                            className={checkQues ? `form-control` : `form-control is-invalid`}
                            placeholder="Write Your Question"
                            value={ques.cont}
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
                            {!ques.image ?
                                <span>preview</span>
                                :
                                <Zoom><img src={ques.image} alt=""></img></Zoom>
                            }
                        </div>
                    </div>

                    {ans && ans.map((val, index) => {
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
                                            value={val.cont}
                                            onChange={(event) => {
                                                handlerChangAns(event, val.id);
                                            }}
                                        />
                                    </div>
                                    <span>
                                        {ans && ans.length > 1 && <FaMinusSquare size={'2em'} color='red' cursor={`pointer`}
                                            onClick={() => {
                                                handlerDeleteAns(val.id)
                                            }}
                                        />}
                                        {ans && index === ans.length - 1 && <FaPlusSquare size={'2em'} cursor={`pointer`} color='green' onClick={handlerAddAns} />}
                                    </span>
                                </div>
                            </div>)

                    })
                        // console.log("index ", index, "val ", val)

                    }





                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveQues}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={HandlerDeleteImg}>
                        Delete All
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AModalAddQues;