import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Alert} from "./index";

const ResponseHandler = ({res, alert = true, index = false}) => {
    let response = {
        status: res?.status, success: false, data: null,
    };
    if (res?.status === 200) {
        !index && Alert.SUCCESS(res?.data?.message);
        response = {...response, success: true, data: res?.data?.data}
        return response;
    } else {
        switch (res?.response?.status) {
            case  400 :
                Alert.ERROR(res?.response?.data?.message);
                response = {...response, data: res?.response?.data}
                break;
            case  401 :
                Alert.ERROR('شما به این قسمت دسترسی ندارید');
                Cookies.remove("token");
                window.location.href = "/login";
                response = {...response, data: res?.response?.data}
                break;
            case  403 :
                Alert.ERROR('شما به این قسمت دسترسی ندارید');
                Cookies.remove("token");
                window.location.href = "/login";
                response = {...response, data: res?.response?.data}
                break;
            case  404 :
                Alert.ERROR(res?.response?.data?.message);
                response = {...response, data: res?.response?.data}
                break;
            case  422 :
                Alert.ERROR(res?.response?.data?.message);
                response = {...response, data: res?.response?.data}
                break;
            case  500 :
                Alert.ERROR("اتصال شما به سرور برقرار نیست");
                response = {...response, data: res?.response?.data}
                break;
            default  :
                break;
        }
        return response;
    }
}

export default ResponseHandler;