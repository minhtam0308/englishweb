import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Get5HisUser, GetHistoryUser } from '../../api/apiUser';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';
import Zoom from 'react-medium-image-zoom';
import moment from 'moment';
import { CiMenuKebab } from "react-icons/ci";
import MenuHis from './MenuHis';




const DashBoard = () => {
    const [hisData, setHisData] = useState(null);
    const [focusMenu, setFocusMenu] = useState(null);
    const [allHis, setAllHis] = useState(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const getAllHis = async () => {
            const res = await GetHistoryUser();
            setHisData(res);
            // console.log(res);
        }
        const get5His = async () => {
            const res = await Get5HisUser();
            setHisData(res);
        }
        if (allHis) {
            getAllHis();
        } else {
            get5His();
        }
    }, [allHis, reset])
    const handleClickMenuHis = (HisInforTime, idLess) => {
        // console.log(hisData);
        setFocusMenu([HisInforTime, idLess]);
    }
    // console.log(allHis)
    // console.log(hisData);
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
                        {hisData?.EC === 0
                            ?
                            hisData.his?.map((val, index) => {
                                return (

                                    <tr key={`his ${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{val.LessInfor.title}</td>
                                        <td>{
                                            val.LessInfor.image?.data?.length > 0
                                                ?
                                                <Zoom>
                                                    <img alt='imageLess' className='imgHisLess' src={ConvertBufferToBase64(val.LessInfor.image)} />
                                                </Zoom>
                                                :
                                                ""
                                        }</td>
                                        <td>
                                            {moment(val.HisInfor.startAt).format('DD/MM/yyyy')}</td>
                                        <td>{moment(Date.parse(val.HisInfor.finishAt) - Date.parse(val.HisInfor.startAt)).toISOString().substring(11, 19)}</td>
                                        <td style={{ "position": "relative" }}>{`${val.HisInfor.countCorrect} / ${val.countQues}`}
                                            <span className={`menu-his ${focusMenu && focusMenu[0] === val.HisInfor.time && focusMenu[1] === val.LessInfor.id && "focus"}`}
                                                onClick={() => {
                                                    handleClickMenuHis(val.HisInfor.time, val.LessInfor.id);
                                                }}
                                            ><CiMenuKebab /></span>
                                            <MenuHis
                                                setFocusMenu={setFocusMenu}
                                                timeHis={val.HisInfor.time}
                                                idLess={val.LessInfor.id}
                                                focusMenu={focusMenu}
                                                setReset={setReset}
                                                reset={reset}
                                            />
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            <tr>
                                <td colSpan={6}>You have not done any lesstions</td>
                            </tr>
                        }
                        <tr>

                            {allHis ?
                                <td
                                    colSpan={'6'}
                                    style={{ 'textAlign': 'center' }}
                                    className='poiter'
                                    onClick={() => { setAllHis(false) }}
                                >Hide Less</td>
                                :
                                <td
                                    colSpan={'6'}
                                    style={{ 'textAlign': 'center' }}
                                    className='poiter'
                                    onClick={() => {
                                        setAllHis(true)

                                    }}
                                >Show More</td>

                            }

                        </tr>

                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default DashBoard;