


const GetBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            // console.log("send", reader.result) it have header data:image/png;base64;
            resolve(reader.result)
        }
        reader.onerror = reject
    })
}

export default GetBase64;