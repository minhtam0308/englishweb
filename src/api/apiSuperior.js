
import axios from "../axios/axiosConfig"

const get5UserAccount = async () => {
    const res = await axios.get('api/get5AccountUser');
    return res;
}
const getAllUserAccount = async () => {
    const res = await axios.get('api/getAllAccountUser');
    return res;
}
const DelUserAccount = async (id) => {
    const res = await axios.delete('api/DeleteUserAccount', { data: { id } });
    return res;
}
const UpUserToTeach = async (id) => {
    const res = await axios.put('api/PutUpUserToTeach', { id });
    return res;
}

const get5AdminAccount = async () => {
    const res = await axios.get('api/Get5AdminAccount');
    return res;
}
const getAllAdminAccount = async () => {
    const res = await axios.get('api/GetAllAdminAccount');
    return res;
}
export {
    get5UserAccount,
    getAllUserAccount,
    DelUserAccount,
    UpUserToTeach,
    get5AdminAccount,
    getAllAdminAccount
}