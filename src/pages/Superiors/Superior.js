import { Outlet } from "react-router-dom";
import HeaderSuper from "../../components/Superior/HeaderSuper";

const Superior = () => {
    return (<>
        <div className="header-container">
            <HeaderSuper />

        </div>
        <div className="content">
            <Outlet />
        </div>
    </>)
}
export default Superior;