import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Iconify from "../../components/Iconify";
import {useTranslation} from "react-i18next";
import Label from "../../components/Label";
import * as moment from "jalali-moment";

const ShowEmailConfig = ({setTab, tab, emailConfig}) => {
    const filterData = emailConfig?.filter((i) => i.id === tab.id);
    const {t} = useTranslation();
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Create_sms")}
                </Typography>
                <Button
                    onClick={() => setTab({numberTab: 0, id: null})}
                    variant="contained"
                    endIcon={<Iconify icon="akar-icons:arrow-left"/>}
                >
                    {t("Back")}
                </Button>
            </Stack>
            {filterData?.map((show, index) => (
                <Paper sx={{padding: 5}} key={show.api_key + index} elevation={3}>
                    <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" gap={3}>
                        <Typography>
                            {t('host')} : {" "}
                            {show.host}
                        </Typography>
                        <Typography>
                            {t('port')} : {" "}
                            {show.port}
                        </Typography>
                        <Typography>
                            {t('User_Name')} : {" "}
                            {show.username}
                        </Typography>
                        <Typography>
                            {t('Encryption')} : {" "}
                            {show.encryption}
                        </Typography>

                        <Typography>
                            {t('created_at')} : {" "}
                            {moment
                                .from(show.created_at, "en", "YYYY/M/D HH:mm")
                                .format("YYYY-M-D HH:mm:ss")}
                        </Typography>
                        <password>
                            {t('Password')} : {" "}
                            {show.password}
                        </password>
                        <Typography>
                            {t('status')} : {" "}
                            <Label
                                variant="ghost"
                                color={(show.active === 0 && 'error') || 'success'}
                            >
                                {show.active === 0 ? t("De_Active") : t("Active")}
                            </Label>
                        </Typography>
                    </Stack>
                </Paper>
            ))}
        </>
    );
};

export default ShowEmailConfig;
