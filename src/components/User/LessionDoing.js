import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetAllQAByUser, GetMaxTimeLessById, PostCheckCorrAns } from "../../api/apiUser";
import { Buffer } from 'buffer';
import Zoom from 'react-medium-image-zoom';
import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";



const LessionDoing = (props) => {

    const color = ["#1e73be", "#2ca8a4", "#f4b400", "#e94b3c"];

    let location = useLocation();
    let lession = location.state.val;
    // console.log(lession);

    const [pageQues, setPageQues] = useState(0);
    const [dataQA, setDataQA] = useState(null);

    const [checkCorrAns, setCheckCorrAns] = useState(null);
    const [timeLess, setTimeLess] = useState(null);

    useEffect(() => {
        getQA();
    }, [])

    const getQA = async () => {
        const res = await GetAllQAByUser(lession.id);
        const maxTime = await GetMaxTimeLessById(lession.id);
        setDataQA(res.data);
        if (maxTime && maxTime.EM === null) {
            setTimeLess(1);

        } else {
            setTimeLess(maxTime.EM + 1);

        }

    }
    const ConvertBufferToBase64 = (image) => {
        if (image && typeof image !== 'string') {
            let res = Buffer.from(image, 'base64').toString('utf8');
            return res;
        }
        return image;
    }

    const handleChooseAns = async (idAns, idQues, idLess, time) => {
        let res = await PostCheckCorrAns(idAns, idQues, idLess, time);
        console.log(res)
        if (res.EC === 0 && checkCorrAns === null) {
            if (res.EM === "Correct") {
                setCheckCorrAns({
                    id: idAns,
                    is_true: true
                });
            } else {
                setCheckCorrAns({
                    id: idAns,
                    is_true: false
                });
            }
            setTimeout(() => {
                setPageQues(pageQues + 1);
                setCheckCorrAns(null);

            }, 1500)

        }

    }
    // console.log(pageQues)

    return (
        <>

            <div className="body-container">
                <div className="container">

                    {dataQA && dataQA.length > pageQues &&
                        <>
                            <div className="question-box">

                                <h3 className="text-center">
                                    {dataQA[pageQues].cont}
                                </h3>
                            </div>

                            {dataQA[pageQues].image &&
                                <div className='preview'>
                                    <Zoom><img src={ConvertBufferToBase64(dataQA[pageQues].image)} alt=""></img></Zoom>
                                </div>
                            }

                            <div className="row">
                                {dataQA[pageQues].ans.map((val, index) => {
                                    return (
                                        <div
                                            key={`UserDoingQA${index}`}
                                            className={`col-md-${(dataQA[pageQues].ans.length % 2 === 0 ? 6 : 4)} poiter`}
                                            onClick={() => {
                                                handleChooseAns(val.id, dataQA[pageQues].id, lession.id, timeLess);
                                                // because beautifull so choose only one answer
                                            }

                                            }
                                        >
                                            <div className="answer-option" style={{ backgroundColor: `${color[index % 4]}` }}>
                                                {checkCorrAns && val.id === checkCorrAns.id && (checkCorrAns.is_true
                                                    ?
                                                    <div className="corr">
                                                        <TiTick
                                                            color="#14ab3d"
                                                            size={'5rem'}
                                                        />
                                                    </div>
                                                    :
                                                    <div className="incorr">
                                                        <FaXmark
                                                            color="red"
                                                            size={'5rem'}
                                                        />
                                                    </div>)

                                                }
                                                <p>
                                                    {val.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}


                            </div>
                        </>
                    }


                </div>
            </div>

        </>
    )
}
export default LessionDoing;