
import Zoom from 'react-medium-image-zoom';
import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import ConvertBufferToBase64 from '../../handlerCommon/ConvertBufferToBase64';
import { NavLink } from 'react-router-dom';
const LessionDoingResult = (props) => {

    const { choseQues, color, corr, totalqQues } = props;

    return (
        <div className="result-container">
            <h1 className="text-center">
                RESULT: {choseQues && choseQues.length > 0 && `${corr} / ${totalqQues}`}
            </h1>
            {choseQues && choseQues.length > 0 &&
                choseQues.map((val, index) => {
                    let listAns = [];

                    return <div key={`result-${index}`} className="result_container">

                        <h3 className="number-question">Question {index + 1}: </h3>
                        <div className="question-box">

                            <h3 className="text-center">
                                {val.choseQues.cont}
                            </h3>
                        </div>

                        {val.choseQues.image &&
                            <div className='preview'>
                                <Zoom><img src={ConvertBufferToBase64(val.choseQues.image)} alt=""></img></Zoom>
                            </div>
                        }

                        <div className="row">
                            {val.choseQues.ans.map((valAns, indexAns) => {
                                let checkCorr = false;

                                val.corrAns.forEach(element => {
                                    if (element === valAns.id) {
                                        checkCorr = true;
                                        listAns.push(valAns.description);
                                    }
                                });
                                // console.log(val)
                                return (
                                    <div
                                        key={`UserDoingQA${indexAns}`}
                                        className={`col-md-${(val.choseQues.ans.length % 2 === 0 ? 6 : 4)}`}

                                    >
                                        <div className="answer-option" style={{ backgroundColor: `${color[(indexAns + index) % 4]}` }}>
                                            {val.checkCorrAns && valAns.id === val.checkCorrAns.id && (val.checkCorrAns.is_true
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
                                            {checkCorr &&
                                                <div className="corr">
                                                    <TiTick
                                                        color="#14ab3d"
                                                        size={'5rem'}
                                                    />
                                                </div>


                                            }
                                            <p>
                                                {valAns.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        <h3 className="number-question">Correct Answer: </h3>
                        <div className="question-box col-md-6">

                            <h3 className="text-center">
                                {listAns && listAns.length > 0 && listAns.map((element, len) => {
                                    if (len === listAns.length - 1) {
                                        return `${element}`

                                    }
                                    return `${element}, `
                                })}
                            </h3>
                        </div>

                    </div>
                })

            }
            <NavLink to="/">
                <button className='btn btn-secondary'>
                    Go To Home Page
                </button>
            </NavLink>
        </div>
    )
}

export default LessionDoingResult;