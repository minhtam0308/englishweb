
import { useContext, useEffect, useState } from 'react';
import { apiGetAllLession } from '../../api/apiAdmin';
import { Buffer } from 'buffer';
import Zoom from 'react-medium-image-zoom'
import { NavLink } from 'react-router-dom';
import { ContextAuth } from '../../Context/Context';
const HomeCenterContent = () => {

    const [listLess, setListLess] = useState([])
    const Auth = useContext(ContextAuth);


    useEffect(() => {

        const getAllLession = async () => {
            const res = await apiGetAllLession();
            if (res && res.EC === 0) {
                setListLess(ConvertBufferToBase64(res.data));

            }

        }
        if (Auth.auth.auth === true) {
            getAllLession();
        }
    }, [])


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
    return (
        <>
            <div className="center-content">
                <div className="header-content">
                    <span>CHANG 0</span>
                    <h1>ĐÁNH GIÁ NĂNG LỰC</h1>
                </div>
                <div className="card-container">

                    {listLess && listLess.length > 0 && listLess.map((val, index) => {
                        return (

                            <div key={`lessionListkey${index}`} className={`excard ${index}`}>
                                <div className="image">
                                    {val.image ?
                                        <Zoom>
                                            <img src={val.image} alt="" />
                                        </Zoom>

                                        :
                                        'do not hane any images'
                                    }
                                </div>
                                <div className="content-card">
                                    <div className="title">
                                        {val.title}
                                    </div>
                                    <div className="description">
                                        {val.description}
                                    </div>
                                    <div className="finish-container">
                                        <NavLink
                                            to={'/doingLess'}
                                            state={{ val }}
                                        >
                                            <button className="btn finish m-3">học ngay</button>

                                        </NavLink>
                                        {/* <NavLink
                                            to={'/'}
                                            state={{ val }}
                                        >
                                            <button className="btn btn-info m-3">Chi tiết</button>

                                        </NavLink> */}
                                    </div>
                                </div>
                            </div>

                        )
                    })}




                </div>

            </div>
        </>
    )
}

export default HomeCenterContent;