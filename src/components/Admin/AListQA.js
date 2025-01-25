import { useEffect } from "react";
import { apiGetAllQA } from "../../api/apiAdmin";


const AListQA = (props) => {
    useEffect(() => {
        listQA();
    }, [])

    let listQA = async () => {
        let res = await apiGetAllQA(props.id);
    }

    return (
        <>
            <div className="list-qa col-2">
                listQA
            </div>
        </>
    )
}
export default AListQA;