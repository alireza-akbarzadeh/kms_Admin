// material
import {alpha, styled, Grid, Container} from '@mui/material';
import {Card, Typography} from '@mui/material';
// utils

import Iconify from '../../components/Iconify';
import {useTranslation} from "react-i18next";
import {Page, SwitchButton} from "../../components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {notifySettingAction} from "../../redux/features/admin/notifySettingSlice";
import {getNotifySettingAction} from "../../redux/features/admin/getNotifiSetting";
import {LoadingCore} from "../../core";
import _ from 'lodash'
// ----------------------------------------------------------------------


const Item = ({color, icon, title, children}) => {
    const RootStyle = styled(Card)(({theme}) => ({
        boxShadow: 'none',
        textAlign: 'center',
        padding: theme.spacing(5, 0),
        color: color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : theme.palette.info.dark,
        backgroundColor: color === "error" ? theme.palette.error.light : color === "success" ? theme.palette.success.light : color === "warning" ? theme.palette.warning.light : theme.palette.info.light,
    }));

    const IconWrapperStyle = styled('div')(({theme}) => ({
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(8),
        height: theme.spacing(8),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : theme.palette.info.dark,

        backgroundImage: `linear-gradient(135deg, ${alpha(color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : theme.palette.info.dark, 0)} 0%, ${alpha(color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : theme.palette.info.dark, 0.24)} 100%)`
    }));
    return (<RootStyle>
        <IconWrapperStyle>
            <Iconify icon={icon} width={24} height={24}/>
        </IconWrapperStyle>
        <Typography mb={4} variant="subtitle2" sx={{opacity: 0.72}}>
            {title}
        </Typography>
        {children}
    </RootStyle>)
}
// ----------------------------------------------------------------------

const TOTAL = 234;

export default function Notification() {
    const {t} = useTranslation();
    const [checked, setChecked] = useState(null);
    const {data, loading} = useSelector((state => state.getNotifySettingSlice))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotifySettingAction())
    }, []);


    useEffect(() => {
        setChecked(data)
    }, [dispatch, data])


    const handleChange = (e, type) => {
        let newCheck = {...checked};
        newCheck[type] = e.target.checked
        dispatch(notifySettingAction(newCheck))
            .then(res => {
                setChecked(newCheck)
            })
    }

    if (loading || checked === null) return <LoadingCore loading={loading}/>
    return (<Page title={`kms | Systematic Notification`}>
        <Container>
            <Typography mb={5} component={"h4"} variant={"h5"} color={"text.secondary"}>
                {t('Notification_via_message')}
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} lg={4}>
                    <Item color={"error"} icon={"bx:message-alt"} title={t('Internal_notification')}>
                        <SwitchButton checked={checked.sms} handleChange={(e) => handleChange(e, "sms")}/>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Item color={"success"} icon={"ic:baseline-mark-email-read"}
                          title={t('Notification_via_email')}>
                        <SwitchButton checked={checked.email} handleChange={(e) => handleChange(e, "email")}/>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Item color={"warning"} title={t('Systematic_Notification')}
                          icon={"ant-design:message-filled"}>
                        <SwitchButton checked={checked.message} handleChange={(e) => handleChange(e, "message")}/>
                    </Item>
                </Grid>
            </Grid>
        </Container>
    </Page>);
}
