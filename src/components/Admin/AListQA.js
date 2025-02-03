import { useEffect, useState } from "react";
import { apiGetAllQA, apiPostDeleteQuesById } from "../../api/apiAdmin";
import { toast } from "react-toastify";
import Zoom from 'react-medium-image-zoom';
import { Buffer } from 'buffer';
import { Table } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";


const AListQA = (props) => {

    const [dataQA, setDataQA] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        listQA();
    }, [refresh, props.clickSave])

    const listQA = async () => {
        let res = await apiGetAllQA(props.id);

        setDataQA(res);
        // console.log(res)
        if (res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    const ConvertBufferToBase64 = (image) => {
        if (image) {
            let res = Buffer.from(image, 'base64').toString('utf8');
            return res;
        }

    }

    const HandlerDeleteQues = async (id) => {
        const res = await apiPostDeleteQuesById(id);
        setRefresh(!refresh)
        console.log(res)
    }

    return (
        <>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Information</th>
                        <th>Actiton</th>

                    </tr>
                </thead>
                <tbody>
                    {dataQA && dataQA.data && dataQA.data.length > 0 && dataQA.data.map((val, index) => {
                        return <tr>
                            <td> <div className="list-qa">
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

                                                />
                                                <div className='col-8'>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={valAns.description}

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
                                        /></button>
                                    <button className='btn btn-info mx-1'

                                    ><ImBin2
                                            color={'red'}
                                            size={'1.5em'}
                                            onClick={() => {
                                                HandlerDeleteQues(val.id)
                                            }}
                                        /></button>
                                </div>
                            </td>

                        </tr>
                    })}

                </tbody>
            </Table>





        </>
    )
}
export default AListQA;