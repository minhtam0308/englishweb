import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Buffer } from 'buffer';
import { apiGetAllLession } from '../../api/apiAdmin';

const AListLession = () => {

    const [listLession, setListLession] = useState([])


    useEffect(() => {
        getListLession();
    }, [])

    const getListLession = async () => {
        const res = await apiGetAllLession();

        if (res) {
            setListLession(ConvertBufferToBase64(res.data));

        }
    }

    // convert from buffer to base64
    // const base64Data = Buffer.from(bufferDataGoesHere).toString("base64"); sai sai sai
    // Buffer.from(base64encoded, 'base64').toString('utf8');
    const ConvertBufferToBase64 = (listLess) => {
        if (listLess.length > 0) {
            let res = listLess.map((value, index) => {
                if (value.image) {
                    value.image = Buffer.from(value.image, 'base64').toString('utf8');

                }
                return value;
            })
            return res;
        }

    }

    console.log(listLession)

    return (
        <Table striped bordered hover>
            <thead className="table-info">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listLession && listLession.length > 0 && listLession.map((val, index) => {
                    console.log(val.image)
                    return (
                        <tr key={`lesslist${index}`} className='listLession-td'>
                            <td>{val.id}</td>
                            <td>{val.title}</td>
                            <td className='image'>
                                {val.image ?
                                    <img src={val.image} />
                                    :
                                    <p>preview</p>}
                            </td>
                            <td>{val.description}</td>
                            <td>{val.level}</td>
                            <td>{val.level}</td>
                        </tr>)

                })}

            </tbody>
        </Table>
    );
}

export default AListLession;