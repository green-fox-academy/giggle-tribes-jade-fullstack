import config from '../config';
import { getToken } from '../services/storeToken';

async function sendRequest(path, body, method) {
    const token = getToken();
    const URL = config.sendRequest.url + path;
    const requestOptions = {
        method: method,
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: token != null ? 'Bearer ' + token : undefined,
        },
    };

    let response = await fetch(URL, requestOptions);
    let responseBody = await response.json();

    return { response, responseBody };
}

export default sendRequest;