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
import * as moment from "jalali-moment";
import ShowEmailConfig from "../containers/emailConfig/ShowEmailConfig";
import CreateEmail from "../containers/emailConfig/CreateEmail";
import ListEmail from "../containers/emailConfig/ListEmail";
import {getEmailList} from "../redux/features/admin/email/indexSlice";
import {LoadingCore} from "../core";

// ----------------------------------------------------------------------

export default function Email() {
    const [tab, setTab] = useState({numberTab: 0, id: null});
    const [emailConfig, setEmailConfig] = useState([]);
    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getEmailListSlice);
    const {isSuccess: createStatus} = useSelector((state) => state.storeEmailSlice);
    const {isSuccess: updateStatus} = useSelector((state) => state.updateEmailSlice);


    console.log(data, "emdil Data")
    useEffect(() => {
        setEmailConfig(data?.data)
    }, [data]);

    useEffect(() => {
        dispatch(getEmailList());
    }, [createStatus, updateStatus]);

    const dir = t("dir") === "rtl";
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <Page
            title={`Email Config | ${tab.numberTab === 0 ? "Kms" : tab.numberTab === 1 ? "create" : tab.numberTab === 2 ? "show" : null}`}>
            <Container>
                {tab.numberTab === 0 &&
                <ListEmail emailConfig={emailConfig} setEmailConfig={setEmailConfig} setTab={setTab}/>}
                {tab.numberTab === 1 && <CreateEmail emailConfig={emailConfig?.data} tab={tab} setTab={setTab}/>}
                {tab.numberTab === 2 && <ShowEmailConfig emailConfig={emailConfig?.data} tab={tab} setTab={setTab}/>}
            </Container>
        </Page>
    );
}
