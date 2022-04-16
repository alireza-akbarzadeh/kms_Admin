import {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate} from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    Container,
    Typography,
    Pagination
} from '@mui/material';
// components
import Page from '../components/Page';
//
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getSmsList} from "../redux/features/admin/sms/indexSlice";
import * as moment from "jalali-moment";
import ListSms from "../containers/smsConfig/ListSms";
import CreateSms from "../containers/smsConfig/CreateSms";
import ShowSmsConfig from "../containers/smsConfig/ShowSmsConfig";
import {LoadingCore} from "../core";

// ----------------------------------------------------------------------

export default function Sms() {
    const [tab, setTab] = useState({numberTab: 0, id: null});
    const [smsConfig, setSmsConfig] = useState([]);
    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getSmsListSlice);
    const {isSuccess: createStatus} = useSelector((state) => state.storeSmsSlice);
    const {isSuccess: updateStatus} = useSelector((state) => state.updateSmsSlice);
    useEffect(() => {
        setSmsConfig(data?.data)
    }, [data]);

    useEffect(() => {
        dispatch(getSmsList());
    }, [createStatus, updateStatus]);

    const dir = t("dir") === "rtl";
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <Page
            title={`Sms Config | ${tab.numberTab === 0 ? "Kms" : tab.numberTab === 1 ? "create" : tab.numberTab === 2 ? "show" : null}`}>
            <Container>
                {tab.numberTab === 0 && <ListSms smsConfig={smsConfig} setSmsConfig={setSmsConfig} setTab={setTab}/>}
                {tab.numberTab === 1 && <CreateSms smsConfig={smsConfig?.data} tab={tab} setTab={setTab}/>}
                {tab.numberTab === 2 && <ShowSmsConfig smsConfig={smsConfig?.data} tab={tab} setTab={setTab}/>}
            </Container>
        </Page>
    );
}
