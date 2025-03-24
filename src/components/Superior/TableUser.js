
import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import { get5UserAccount, getAllUserAccount } from '../../api/apiSuperior.js';
import { CgDetailsMore } from "react-icons/cg";
import ModalDetailAccount from './ModalDetailAccount.js';

const TableUser = () => {
    const [dataUser, setDataUser] = useState(null);
    const [getAllUser, setGetAllUser] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [inforUserDetail, setInforUserDetail] = useState(null);
    const [resetpage, setResetPage] = useState(false);

    useEffect(() => {
        const get5Userhandle = async () => {
            const res = await get5UserAccount();
            if (res.EC === 0) {
                setDataUser(res.EM);
            }
        }
        const getAllUserhandle = async () => {
            const res = await getAllUserAccount();
            if (res.EC === 0) {
                setDataUser(res.EM);
            }
        }

        if (getAllUser === false) {
            get5Userhandle();
        } else {
            getAllUserhandle();
        }


    }, [getAllUser, resetpage])

    // console.log(dataUser)
    return (<>
        <div className='table-account'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>User Name</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser && dataUser.map((val, index) => {
                        return (
                            <tr key={`${index}user`}>
                                <td>{index + 1}</td>
                                <td>{val.email}</td>
                                <td>{val.userName}</td>
                                <td style={{ "textAlign": "center" }}>
                                    <span
                                        className='poiter'
                                        onClick={() => {
                                            setModalDetail(true);
                                            setInforUserDetail(val);
                                        }}
                                    >
                                        <CgDetailsMore
                                            size={'2em'}
                                            color='blue'
                                        />
                                    </span></td>
                            </tr>
                        )
                    })}

                    <tr>
                        <td
                            colSpan={4}
                            style={{ "textAlign": "center" }}
                            className='poiter'
                            onClick={() => {
                                setGetAllUser(!getAllUser)
                            }}
                        >
                            {getAllUser ? "Hide Less" : "Show More"}
                        </td>

                    </tr>
                </tbody>
            </Table>
        </div>
        <ModalDetailAccount
            show={modalDetail}
            setShow={setModalDetail}
            inforUser={inforUserDetail}
            setResetPage={setResetPage}
            resetpage={resetpage}
        />
    </>)
}

export default TableUser;