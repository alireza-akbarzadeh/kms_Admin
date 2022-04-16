import React, {useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useTranslation} from "react-i18next";
import {GetDeparteman} from "../containers";
import {GetTicketList} from "../containers";

const Ticket = () => {
    const [value, setValue] = useState('1');
    const {t} = useTranslation();
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label={t("Ticket")} value="1"/>
                        <Tab label={t("Department")} value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1"><GetTicketList/></TabPanel>
                <TabPanel value="2"><GetDeparteman/></TabPanel>
            </TabContext>
        </Box>
    );
};

export default Ticket;
