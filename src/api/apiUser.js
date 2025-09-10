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

const GetHistoryUser = async () => {
    try {
        let res = await axios.get('api/GetHisUser');
        return res;
    } catch (e) {
        console.log(e)
    }
}

const PutUpdateUser = async (userName, imageUser) => {
    try {
        let res = await axios.put('api/PutChangeInforUser', { userName, imageUser });
        return res;
    } catch (e) {
        console.log("err from fronend")
    }
}

const Get5HisUser = async () => {
    try {
        let res = await axios.get('api/Get5His');
        return res;
    } catch (e) {
        console.log(e)
    }
}

const DelHisUser = async (time, idLess) => {
    try {
        // console.log(time, idLess);
        let res = await axios.delete('api/DelHisUser', {
            data: {
                time,
                idLess
            }
        });
        return res;
    } catch (e) {
        console.log(e)
    }
}

const PostComment = async (comment) => {
    try {
        let res = await axios.post('api/PostComment', { comment });
        return res;
    } catch (e) {
        console.log(e)
    }
}

const PostOtpPass = async (email) => {
    try {
        let res = await axios.post('api/PostSendOTPEmail', { email });
        return res;
    } catch (e) {
        console.log(e)
    }
}

const GetAuthUserLimitTime = async () => {
    try {
        let res = await axios.get('api/GetAuthUserLimitTime');
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
    PutChangePassword,
    GetHistoryUser,
    PutUpdateUser,
    Get5HisUser,
    DelHisUser,
    PostComment,
    PostOtpPass,
    GetAuthUserLimitTime
}