import axios from "axios";

const api = axios.create({
    baseURL: "https://0xt1h2iyj0.execute-api.us-east-1.amazonaws.com/Prod/setrecordingstatus",
    headers: {
        // ":authority": "0xt1h2iyj0.execute-api.us-east-1.amazonaws.com",
        // ":method": "POST",
        // ":path": "/Prod/setrecordingstatus",
        // ":scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "content-length": "129",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "origin": "https://d1jjpla3n9jdjr.cloudfront.net",
        "referer": "https://d1jjpla3n9jdjr.cloudfront.net/",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
    }
})

const AWSApi = {
    api: api
}

export default AWSApi; 