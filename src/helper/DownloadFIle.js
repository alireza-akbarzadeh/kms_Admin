import axios from "axios";
import _ from "lodash";
import cookie from "js-cookie";


const ENDPOINT = process.env.KMS_APP_BASE_URL;
const token = cookie.get('token')

const Download = (name, address) => {
    axios({
        method: 'POST',
        url: `https://back.deriko.net/api/document/downloadFile`,
        withCredentials: true,
        headers: {authorization: 'Bearer ' + token},
        data: {
            address: address
        },
        responseType: 'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = name + '.' + _.last(address.split('.'))
        link.click();
    });

};

export default Download