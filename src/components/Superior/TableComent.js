import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { get5Comment, getAllComment } from '../../api/apiSuperior';
import moment from 'moment';
import ModalDelComment from './ModalDelComment';

const TableComment = () => {
    const [dataComment, setDataComment] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [modalDelComment, setModalDelComment] = useState(false);
    const [commentDel, setCommentDel] = useState(null);
    const [resetPage, setResetPage] = useState(false);

    useEffect(() => {
        const handleGet5Comment = async () => {
            let res = await get5Comment();
            if (res?.EC === 0) {
                setDataComment(res.EM);
            }
        }
        const handleAllComment = async () => {
            let res = await getAllComment();
            if (res?.EC === 0) {
                setDataComment(res.EM);
            }
        }

        if (showMore) {
            handleAllComment();
        } else {
            handleGet5Comment();
        }
    }, [showMore, resetPage])


    const handleShowDelComment = (id, comment) => {
        setCommentDel({ id, comment })
        setModalDelComment(true);
    }
    // console.log(dataComment);
    return (<>
        <div style={{ "marginTop": "50px" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID Account</th>
                        <th>Content Coment</th>
                        <th>Time</th>
                        <th>Retouch</th>
                    </tr>
                </thead>
                <tbody>
                    {dataComment?.map((val, index) => {
                        return (
                            <tr key={`${index}comment`}>
                                <td>{index + 1}</td>
                                <td>{val.id_tk}</td>
                                <td>{val.comment}</td>
                                <td>{moment(val.createdAt).format('DD/MM/yyyy')}</td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => {
                                            handleShowDelComment(val.id, val.comment);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                    })}


                    <tr>
                        <td
                            colSpan={5}
                            style={{ "textAlign": "center" }}
                            className='poiter'
                            onClick={() => {
                                setShowMore(!showMore);
                            }}
                        >{showMore ? "Hide Less" : 'Show More'}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <ModalDelComment
            show={modalDelComment}
            setShow={setModalDelComment}
            commentDel={commentDel}
            setCommentDel={setCommentDel}
            resetPage={resetPage}
            setResetPage={setResetPage}
        />
    </>)
}
export default TableComment;