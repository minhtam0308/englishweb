import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GetHistoryUser } from '../../api/apiUser';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';
import Zoom from 'react-medium-image-zoom';
import moment from 'moment';




const DashBoard = () => {
    const [hisData, setHisData] = useState(null);

    useEffect(() => {
        const getHis = async () => {
            const res = await GetHistoryUser();
            setHisData(res);
            console.log(res);
        }
        getHis();
    }, [])
    return (
        <>
            <div className="center-content">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lession Name</th>
                            <th>Lession Image</th>
                            <th>Start At</th>
                            <th>Time Doing</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hisData?.map((val, index) => {
                            return (

                                <tr key={`his ${index}`}>
                                    <td>{index}</td>
                                    <td>{val.LessInfor.title}</td>
                                    <td>{
                                        val.LessInfor.image
                                            ?
                                            <Zoom>
                                                <img alt='imageLess' className='imgHisLess' src={ConvertBufferToBase64(val.LessInfor.image)} />
                                            </Zoom>
                                            :
                                            ""
                                    }</td>
                                    <td>{moment(val.HisInfor.startAt).zone('+07:00').format('DD/MM/yyyy')}</td>
                                    <td>{moment(Date.parse(val.HisInfor.finishAt) - Date.parse(val.HisInfor.startAt)).toISOString().substring(11, 19)}</td>
                                    <td>{`${val.HisInfor.countCorrect} / ${val.HisInfor.countQues}`}</td>
                                </tr>

                            )
                        })}


                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default DashBoard;