import axios from "../axios/axiosConfig"

const GetAllQAByUser = async (id) => {
    try {
        let res = await axios.get(`api/GetAllQAByUser?id=${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

const PostCheckCorrAns = async (idAns, idQues, idLess, time) => {
    try {
        let res = await axios.post(`api/PostCheckCorrAns`,
            {
                idAns,
                idQues,
                time,
                idLess
            })
        return res;
    } catch (e) {
        console.log(e);
    }
}

const GetMaxTimeLessById = async (id) => {
    try {
        let res = await axios.get(`api/GetIdLessMaxById?id=${id}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}
export {
    GetAllQAByUser,
    PostCheckCorrAns,
    GetMaxTimeLessById
}