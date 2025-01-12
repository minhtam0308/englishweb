import axios from "../axios/axiosConfig"

const CreateLession = async (data) => {
    try {
        const res = await axios.post('api/postCreateLession', data);
        return res;
    } catch (e) {
        console.log(e);
    }

}

export {
    CreateLession
}
