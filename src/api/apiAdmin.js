import axios from "../axios/axiosConfig"

const CreateLession = async (data) => {
    try {
        const res = await axios.post('api/postCreateLession', data);
        return res;
    } catch (e) {
        console.log(e);
    }

}

const apiGetAllLession = async () => {
    try {
        const res = await axios.get('api/getAllLession');
        return res;
    } catch (e) {
        console.log(e);
    }
}

const apiPostUpdateLessById = async (id, title, description, image, level) => {
    try {
        const res = await axios.post('api/postUpdateLessById', {
            id, title, description, image, level
        });
        return res;
    } catch (e) {
        console.log("api", e);
    }
}

const apiPostDeleteLessById = async (id) => {
    try {
        const res = await axios.post('api/postDeleteLessById', {
            id
        });
        return res;
    } catch (e) {
        console.log("api", e);
    }
}

const apiPostCreateQuestion = async (ques, ans, idLession) => {
    try {
        const res = await axios.post("api/postCreateQues", {
            idLession,
            ques,
            ans
        })
        return res;
    } catch (e) {
        console.log(e)
    }
}

const apiGetAllQA = async (id) => {
    try {
        let res = await axios.get(`api/getAllQA?id=${id}`)
        return res;
    } catch (e) {
        console.log(e)
    }
}

export {
    CreateLession,
    apiGetAllLession,
    apiPostUpdateLessById,
    apiPostDeleteLessById,
    apiPostCreateQuestion,
    apiGetAllQA
}
