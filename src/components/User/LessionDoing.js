import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetAllQAByUser, GetFindCorrectAns, GetMaxTimeLessById, PostCheckCorrAns } from "../../api/apiUser";
import Zoom from 'react-medium-image-zoom';
import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import LessionDoingResult from "./LessionDoingResult";
import ConvertBufferToBase64 from "../../handlerCommon/ConvertBufferToBase64";
import successAudio from '../../assets/successAudio.mp3';
import errorAudio from '../../assets/errorAudio.mp3';
import ContinueDoing from "./ContinueDoing";


const LessionDoing = (props) => {

    const color = ["#1e73be", "#2ca8a4", "#f4b400", "#e94b3c"];

    let location = useLocation();
    let lession = location.state.less;
    // console.log(lession);

    const [pageQues, setPageQues] = useState(0);
    const [dataQA, setDataQA] = useState(null);

    const [checkCorrAns, setCheckCorrAns] = useState(null);
    const [timeLess, setTimeLess] = useState(null);

    const [corr, setCorr] = useState(0);
    const [choseQues, setChoseQues] = useState([]);

    const [checkClick, setCheckClick] = useState(false);

    const [continueDoing, setContinueDoing] = useState(null);

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
    //music
    const [successMusic] = useState(new Audio(successAudio));
    const [errorMusic] = useState(new Audio(errorAudio));


    const ControlAudio = (key, type) => {
        const playAudio = () => {
            if (type === "success") {
                successMusic.play();
            } else if (type === "error") {
                errorMusic.play();
            }

        }

        const pauseAudio = () => {
            successMusic.pause();
            successMusic.currentTime = 0;
            errorMusic.pause();
            errorMusic.currentTime = 0;

        }
        if (key === "start") {
            playAudio();
        } else if (key === "pause") {
            pauseAudio();
        }
        return true;
    }



    const handleChooseAns = async (idAns, idQues, idLess, time) => {
        setCheckClick(true);// sfter finishing this handle current, this var update
        if (checkClick === false) {
            let res = await PostCheckCorrAns(idAns, idQues, idLess, time);
            let resCorrAns = await GetFindCorrectAns(idQues);
            // console.log(res)
            if (res.EC === 0 && resCorrAns.EC === 0 && checkCorrAns === null) {
                if (res.EM === "Correct") {
                    ControlAudio("start", "success");
                    setContinueDoing("success");
                    setCheckCorrAns({
                        id: idAns,
                        is_true: true
                    });
                    setCorr(corr + 1);
                    let temp = [...choseQues];
                    temp.push({
                        choseQues: dataQA[pageQues],
                        corrAns: resCorrAns.EM,
                        checkCorrAns: {
                            id: idAns,
                            is_true: true
                        }
                    })
                    setChoseQues(temp);
                    // console.log(checkClick); //false


                } else {
                    ControlAudio("start", "error")
                    setContinueDoing("error");

                    setCheckCorrAns({
                        id: idAns,
                        is_true: false
                    });
                    let temp = [...choseQues];
                    temp.push({
                        choseQues: dataQA[pageQues],
                        corrAns: resCorrAns.EM,
                        checkCorrAns: {
                            id: idAns,
                            is_true: false
                        }
                    })
                    setChoseQues(temp);

                }
                //vi o day chechCorrAns = null
                // let temp = [...choseQues];
                // temp.push({
                //     choseQues: dataQA[pageQues],
                //     corrAns: resCorrAns.EM,
                //     checkCorrAns: checkCorrAns
                // })


            }


        }


    }
    // console.log("chose", choseQues)

    const handleClickContinue = () => {
        ControlAudio("pause", "all");
        setPageQues(pageQues + 1);
        setCheckCorrAns(null);
        setCheckClick(false);
        setContinueDoing(null);
    }

    return (
        <>

            <div className="body-container">
                <div className="container">

                    {dataQA && dataQA.length > pageQues &&
                        <>
                            <h3 className="number-question">Question {pageQues + 1}: </h3>
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
                                            <div className="answer-option" style={{ backgroundColor: `${color[(index + pageQues) % 4]}` }}>
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
                    {continueDoing && <ContinueDoing
                        continueDoing={continueDoing}
                        handleClickContinue={handleClickContinue}
                    />}
                    {dataQA && pageQues === dataQA.length &&


                        <LessionDoingResult
                            choseQues={choseQues}
                            color={color}
                            corr={corr}
                            totalqQues={dataQA.length}
                        />

                    }


                </div>
            </div>

        </>
    )
}
export default LessionDoing;