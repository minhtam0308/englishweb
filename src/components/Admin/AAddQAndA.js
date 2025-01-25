import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Zoom from 'react-medium-image-zoom';
import AListQA from "./AListQA";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AModalAddQues from "./AModalAddQues";


const AAddQAndA = (props) => {
    let location = useLocation();
    let lession = location.state.val;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="add-qa-container">
                <h3>Infor Lession</h3>
                <div className="infor-less">
                    <Table striped bordered hover>
                        <thead className="table-info">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lession &&
                                <tr className='listLession-td'>
                                    <td>{lession.id}</td>
                                    <td>{lession.title}</td>
                                    <td className='image'>
                                        {lession.image ?
                                            <Zoom>
                                                <img src={lession.image} alt='not have img' />
                                            </Zoom>

                                            :
                                            <p>preview</p>}
                                    </td>
                                    <td>{lession.description}</td>
                                    <td>{lession.level}</td>

                                </tr>

                            }

                        </tbody>
                    </Table>
                </div>
                <div className="content-qa-container">
                    <AListQA
                        id={lession.id}
                    />
                </div>
                <div className="btn-modal-addqa m-3">
                    <Button variant="primary" onClick={handleShow}>
                        Add Question
                    </Button>
                    <AModalAddQues
                        show={show}
                        handleClose={handleClose}
                        idLession={lession.id}
                    />

                </div>

            </div>

        </>
    )
}

export default AAddQAndA;