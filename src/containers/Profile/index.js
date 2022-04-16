import * as React from 'react';
// mui lab
import {TabContext, TabList, TabPanel} from "@mui/lab";
// mui
import {Tab, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
// components
import {Icons} from "../../components"
// Containers
import ChangePassword from "./ChangePassword"
import EditAccount from "./EditAccount"
import Notifications from "./Notifications"
import {useSelector} from "react-redux";

export default function Profile() {
    const [value, setValue] = React.useState('1');
    const {t} = useTranslation();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Typography mb={2} component={"h4"} variant={"h4"}>{t("Account")}</Typography>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab icon={<Icons sx={{mx: 1.2}} option='healthicons:ui-user-profile-negative'/>}
                         iconPosition="start"
                         label={t("General")} value="1"/>
                    <Tab icon={<Icons sx={{mx: 1.2}} option='bi:key-fill'/>} iconPosition="start"
                         label={t("Change_Password")} value="2"/>
                    {/*<Tab icon={<Icons sx={{mx: 1.2}} option='clarity:notification-solid'/>} iconPosition="start"*/}
                    {/*     label={t("Notification")} value="3"/>*/}
                </TabList>
                <TabPanel value="1"><EditAccount/></TabPanel>
                <TabPanel value="2"><ChangePassword/></TabPanel>
                {/*<TabPanel value="3"><Notifications/></TabPanel>*/}
            </TabContext>
        </>
    );
}