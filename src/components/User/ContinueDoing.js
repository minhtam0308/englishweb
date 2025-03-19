import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const ContinueDoing = (props) => {
    return (<>
        {
            props.continueDoing === "error" &&
            <div className="container_ContinueDoing">
                <div>
                    <div className="icon">
                        <IoCloseSharp color="red" size={"3em"} />
                    </div>
                    <div className="message">
                        Không chính xác
                    </div>
                    <div className="sub-message">
                        Thử lại lần nữa nhé.
                    </div>
                    <button className="btn btn-custom" onClick={() => { props.handleClickContinue() }}>
                        ĐÃ HIỂU
                    </button>
                </div>
            </div>
        }
        {
            props.continueDoing === "success" && <div class="container_SuccessDoing">
                <div>

                    <div>
                        <FaCheck size={"2em"} />
                        <span class="ms-2">Tuyệt quá!</span>
                    </div>

                    <div class="mt-3">
                        <button class="btn btn-custom"
                            onClick={() => { props.handleClickContinue() }}
                        >TIẾP TỤC</button>
                    </div>
                </div>
            </div>
        }

    </>)
}

export default ContinueDoing;