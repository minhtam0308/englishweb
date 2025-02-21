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

const GetFindCorrectAns = async (idQues) => {
    try {
        if (idQues) {
            let res = await axios.get(`api/GetFindCorrAns?idQues=${idQues}`);
            return res;
        }

    } catch (e) {
        console.log(e);
    }
}

const PostRegisterUser = async (data) => {
    try {
        const res = await axios.post(`api/PostRegisterUser`, data);
        return res;
    } catch (e) {
        console.log(e);
    }
}

const PostLoginUser = async (data) => {
    try {
        const res = await axios.post(`api/PostLoginUser`, data);
        return res;

    } catch (e) {
        console.log(e);
    }
}

const GetRefreshPage = async () => {
    try {
        let res = await axios.get('api/GetRefreshLogin');
        return res
    } catch (e) {
        console.log(e);
    }
}

const PostSendEmailVerify = async (email) => {
    try {
        let res = await axios.post('api/PostSendEmail', { email: email });
        return res;
    } catch (e) {
        console.log(e)
    }
}

const PutUpdateVerifyEmail = async (token_verify, idtk) => {
    try {
        let res = await axios.put('api/PutUpdateVerify', { token_verify, idtk });
        return res;
    } catch (e) {
        console.log(e)
    }
}

const PutChangePassword = async (oldPass, newPass) => {
    try {
        let res = await axios.put('api/PutChangePass', { oldPass, newPass });
        return res;
    } catch (e) {
        console.log(e)
    }
}
export {
    GetAllQAByUser,
    PostCheckCorrAns,
    GetMaxTimeLessById,
    GetFindCorrectAns,
    PostRegisterUser,
    PostLoginUser,
    GetRefreshPage,
    PostSendEmailVerify,
    PutUpdateVerifyEmail,
    PutChangePassword
}