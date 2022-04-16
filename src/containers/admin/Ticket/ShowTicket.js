import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingCore} from "../../../core";
import {showTicketsAction} from "../../../redux/features/admin/Tickets/show";
import {Link as RouterLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Box, Button, Chip, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {BadgeAvatar, Label} from "../../../components";
import AddMessage from "./AddMessage";
import Iconify from "../../../components/Iconify";

const ShowTicket = () => {
        const {data, loading} = useSelector((state) => state.showTicketsSlice);
        const {isSuccess} = useSelector((state) => state.createTicketsSlice);

        const [ticketData, setTicketData] = useState(null);
        const dispatch = useDispatch();
        const {id} = useParams();
        const {t} = useTranslation();

        useEffect(() => {
            dispatch(showTicketsAction(id));
        }, [dispatch])

        console.log(ticketData, "ticket  data")
        useEffect(() => {
            setTicketData(data)
        }, [data]);


        const dir = t("dir") === "rtl";
        if (loading) return <LoadingCore loading={loading}/>
        return (<>
            <Button
                sx={{mb:5}}
                variant="contained"
                component={RouterLink}
                to="/dashboard/ticket"
                startIcon={<Iconify icon="eva:arrow-back-outline"/>}>{t("Back")}
            </Button>
            <Grid container spacing={5}>

                <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 3.5}} elevation={2}>
                        <Stack direction={"column"} gap={3}>
                            <Typography>
                                {t("unique_number")} : {ticketData?.unique_number}
                            </Typography>
                            <Typography>
                                {t("Ticket_Title")} : {ticketData?.subject}
                            </Typography>
                            <Typography>
                                {t("Priority")} :
                                <Label
                                    sx={{fontSize: 15, padding: 1.9}}
                                    color={ticketData?.priority === "بالا" ? "error" : ticketData?.priority === "متوسط" ? "warning" : "default"}
                                    variant={"ghost"}>
                                    {ticketData?.priority === "بالا" ? t("Up") : ticketData?.priority === "متوسط" ? "Medium" : "Low"}
                                </Label>
                            </Typography>
                            <Typography>
                                {t("Department")} :
                                <Chip variant={"outlined"} color={"default"} label={data && ticketData?.department}/>
                            </Typography>
                            <Typography>
                                {t("Ticket_Status")} :
                                {ticketData?.status}
                            </Typography>
                            <Typography>
                                {t("Ticket_date")} :
                                {ticketData?.date}
                            </Typography>
                            <Typography>
                                {t("Ticket_update")} :
                                {ticketData?.updated}
                            </Typography>
                        </Stack>
                    </Paper>
                    <AddMessage messageId={id}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        height: 738, overflow: "auto", padding: 7,
                    }}>
                        {ticketData?.messages?.map((msg, i) => (<Box sx={{
                            display: "flex",
                            gap: 3,
                            width: "100%",
                            margin: "20px 0",
                            flexDirection: msg?.sender_type !== "admin" ? "row-reverse" : "row"
                        }} key={msg?.id + i}>
                            <BadgeAvatar address={msg?.avatar} size={"md"}/>
                            <Paper sx={{
                                padding: 3,
                                width: "100%",
                                background: msg?.sender_type === "admin_answer" ? "#eee" : "#e3e8ec"
                            }}
                                   elevation={3}>
                                <Typography>
                                    {msg?.message}
                                </Typography>
                                <Divider sx={{margin: "15px 0"}}/>
                                <Box sx={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between"
                                }}>
                                    <Typography>
                                        {msg?.name}
                                    </Typography>
                                    <Typography>
                                        {msg?.date}
                                        {msg?.time}
                                    </Typography>
                                </Box>
                                {msg?.file && (<Box mt={3}>
                                    <a download href={msg?.file} target={"_blank"}>فایل ضمیمه</a>
                                </Box>)}
                            </Paper>
                        </Box>))}
                    </Box>
                </Grid>
            </Grid>
        </>)
            ;
    }
;

export default ShowTicket;
