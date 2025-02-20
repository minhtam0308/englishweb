import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PutUpdateVerifyEmail } from "../../api/apiUser";
import { toast } from "react-toastify";


const VerifyPage = () => {

    const [data] = useSearchParams();
    // console.log(data.get('idtk'));
    useEffect(() => {
        const VerifyEmail = async (token_verify, idtk) => {
            // console.log(token_verify)
            const res = await PutUpdateVerifyEmail(token_verify, idtk);
            if (res?.EC === 0) {
                toast.success(res.EM);
            } else {
                toast.warning(res.EM)
            }
        }
        VerifyEmail(data.get('token_verify'), data.get('idtk'));

    }, [])
    return (
        <div style={{ backgroundColor: '#f0f4f8' }}>
            <div style={{ backgroundColor: '#00bfff', textAlign: 'center', padding: '20px' }}>
                LEARNING WEB
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
                <h2 style={{ backgroundColor: '#000080', color: '#ffffff', padding: '10px', borderRadius: '4px' }}>
                    Xác thực địa chỉ email thành công!
                </h2>
                <p>
                    Chào mừng Quý khách đến với
                    <strong>
                        Mochi Learninggg
                    </strong>
                    !
                </p>
                <p>
                    Quý khách có thể quay lại trang web và đăng nhập bằng tài khoản đã đăng ký!
                </p>

                <p>
                    Trân trọng,
                    <br />
                    <strong>
                        tam
                    </strong>
                    Team
                </p>
            </div>
        </div>
    )
}
export default VerifyPage;