
import { useState } from 'react';


const HomeLeftContent = () => {

    const [tip, setTip] = useState(false);

    const handlerTip = () => {
        setTip(!tip);
    }

    return (
        <>
            <div className="tip" onClick={handlerTip}>
                tip luyen nghe &gt;&gt;
                <div className={tip ? 'infor-tip showtip' : 'infor-tip'}>
                    <p>
                        <b>Bước 2:</b> Nghe bắt âm
                        Làm quen phát âm từ vựng mới
                    </p>
                    <p>
                        <b>Bước 2:</b> Nghe vận dụng

                        Nghe kỹ và trả lời câu hỏi theo từng đoạn video
                    </p>
                    <p>
                        <b>Bước 3:</b> Nghe chi tiết

                        Nghe từng câu và điền từ vào chỗ trống
                    </p>
                </div>
            </div>

        </>
    )
}

export default HomeLeftContent;