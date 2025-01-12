
import avarta from '../../assets/avatar.png';
const HomeCenterContent = () => {
    return (
        <>
            <div className="center-content">
                <div className="header-content">
                    <span>CHANG 0</span>
                    <h1>ĐÁNH GIÁ NĂNG LỰC</h1>
                </div>
                <div className="card-container">
                    <div className="excard">
                        <div className="image">
                            <img src={avarta} alt="" />
                        </div>
                        <div className="content-card">
                            <div className="title">
                                title
                            </div>
                            <div className="finish-container">
                                <button className="btn btn-light">Chi tiet</button>
                                <button className="btn finish m-3">học ngay</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeCenterContent;