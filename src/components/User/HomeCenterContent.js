import avarta from '../../assets/avatar.png';

import { useEffect, useState } from 'react';
import { apiGetAllLession } from '../../api/apiAdmin';
import Zoom from 'react-medium-image-zoom';
import { NavLink } from 'react-router-dom';
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';
const HomeCenterContent = () => {

    const [listLess, setListLess] = useState([])


    useEffect(() => {

        const getAllLession = async () => {
            const res = await apiGetAllLession();
            if (res && res?.EC === 0) {
                setListLess(res.data);

            }
            // console.log(res)

        }


        getAllLession();

    }, [])

    // console.log(listLess)

    return (
        <>
            <div className="center-content">


                {listLess && listLess.length > 0 && listLess.map((teacher, index) => {
                    return (
                        <div key={`techer${index}`}>
                            <div className="header-content" >
                                <span className='img-teacher-less'>
                                    {teacher.teacher.image?.data.length > 0 ?
                                        <Zoom>
                                            <img src={ConvertBufferToBase64(teacher.teacher.image)} alt="" />
                                        </Zoom>
                                        :
                                        <img src={avarta} alt="Avarta" />

                                    }</span>
                                <h1>{teacher.teacher.userName}</h1>
                            </div>
                            {teacher?.lession?.map((less, indexStudent) => {
                                return (
                                    <div key={`student${indexStudent}`} className="card-container">
                                        <div key={`lessionListkey${index}`} className={`excard ${index}`}>
                                            <div className="image">
                                                {less.image?.data.length > 0 ?
                                                    <Zoom>
                                                        <img src={ConvertBufferToBase64(less.image)} alt="" />
                                                    </Zoom>

                                                    :
                                                    'do not hane any images'
                                                }
                                            </div>
                                            <div className="content-card">
                                                <div className="title">
                                                    {less.title}
                                                </div>
                                                <div className="description">
                                                    {less.description}
                                                </div>
                                                <div className="finish-container">
                                                    <NavLink
                                                        to={'/doingLess'}
                                                        state={{ less }}
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
                                    </div>
                                )
                            })}

                        </div>
                    )
                }

                )}






            </div>
        </>
    )
}

export default HomeCenterContent;