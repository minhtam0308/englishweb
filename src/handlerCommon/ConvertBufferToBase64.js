import { Buffer } from 'buffer';


const ConvertBufferToBase64 = (image) => {
    if (image) {
        let res = Buffer.from(image, 'base64').toString('utf8');
        return res;
    }

}

export default ConvertBufferToBase64;