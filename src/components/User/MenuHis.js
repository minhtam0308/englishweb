import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DelHisUser } from "../../api/apiUser";
import { toast } from "react-toastify";


const MenuHis = (props) => {
    const { timeHis, idLess, focusMenu, setFocusMenu, setReset, reset } = props;
    const [noneMenu, setNoneMenu] = useState(true);
    const [showModalAcceptDel, setShowModalAcceptDel] = useState(false);
    const handleShowModalAcceptdel = () => {
        setShowModalAcceptDel(true);
        setNoneMenu(true);
    }
    const handleCloseShowModalAcceptdel = () => {
        setShowModalAcceptDel(false);
        setFocusMenu(null);
    }


    useEffect(() => {
        if (focusMenu && timeHis === focusMenu[0] && idLess === focusMenu[1]) {
            setNoneMenu(false);
        } else {
            setNoneMenu(true);
        }
    }, [focusMenu])


    const hanldeDeleteHis = () => {
        handleShowModalAcceptdel();
    }

    const handleAcceptDelHis = async () => {
        if (!focusMenu) {
            toast.error("ERROR");
            return;
        }
        // console.log(focusMenu);
        const res = await DelHisUser(focusMenu[0], focusMenu[1]);
        if (res.EC === 0) {
            toast.success(res.EM);
            handleCloseShowModalAcceptdel();
            setReset(!reset);
        } else {
            toast.error(res.EM);
            handleCloseShowModalAcceptdel();

        }
    }

    return (<>
        {!noneMenu && <div
            className="shield"
            onClick={() => setFocusMenu(null)}
        >
        </div>}

        <div className={`menuHis_container ${noneMenu && "noneMenu"}`}>
            <div className="content_containerHis">
                <div
                    className="hoverhis DeleteHis"
                    onClick={() => { hanldeDeleteHis() }}
                >
                    Delete
                </div>
                <hr style={{ "margin": "0", "opacity": 1 }} />
                <div className="hoverhis DeleteHis"
                    onClick={() => { alert("It is Developped") }}
                >
                    Other
                </div>
            </div>
        </div>

        <Modal show={showModalAcceptDel} onHide={handleCloseShowModalAcceptdel}>
            <Modal.Header closeButton>
                <Modal.Title>ARE YOU SURE DELETE THIS?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseShowModalAcceptdel}>
                    No
                </Button>
                <Button variant="primary" onClick={handleAcceptDelHis}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default MenuHis;