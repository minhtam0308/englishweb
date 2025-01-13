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

export {
    CreateLession,
    apiGetAllLession
}
