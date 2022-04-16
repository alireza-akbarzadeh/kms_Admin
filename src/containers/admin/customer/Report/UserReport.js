import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {reportUserAction} from "../../../../redux/features/admin/customer/report/userReportSlice";
import Page from "../../../../components/Page";
import {
    alpha,
    Box, Button, Card, Grid, IconButton, Stack, styled, Tooltip,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import Iconify from "../../../../components/Iconify";
import ModalReport from "./ModalReport";
import {LoadingCore, ModalCore} from "../../../../core";
import {Link as RouterLink, useParams} from "react-router-dom";


const Item = ({color, icon, title, count, handleSHowDetails, details}) => {
    const RootStyle = styled(Card)(({theme}) => ({
        boxShadow: 'none',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2.5, 2),
        color: color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : color === "info" ? theme.palette.info.dark : theme.palette.grey.A700,
        backgroundColor: color === "error" ? theme.palette.error.light : color === "success" ? theme.palette.success.light : color === "warning" ? theme.palette.warning.light : color === "info" ? theme.palette.info.light : theme.palette.grey.A100,
    }));
    const IconWrapperStyle = styled('div')(({theme}) => ({
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(8),
        height: theme.spacing(8),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : color === "info" ? theme.palette.info.dark : theme.palette.grey.A400,

        backgroundImage: `linear-gradient(135deg, ${alpha(color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : color === "info" ? theme.palette.info.dark : theme.palette.grey.A100, 0)} 0%, ${alpha(
            color === "error" ? theme.palette.error.dark : color === "success" ? theme.palette.success.dark : color === "warning" ? theme.palette.warning.dark : color === "info" ? theme.palette.info.dark : theme.palette.grey.A700,
            0.24
        )} 100%)`
    }));
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Iconify icon={icon} width={24} height={24}/>
            </IconWrapperStyle>
            <Typography variant="subtitle2" sx={{opacity: 0.72}}>
                {title}
            </Typography>
            {count}
            <Tooltip title="نمایش جزِئیات">
                <IconButton disabled={count === 0}>
                    <Iconify sx={{display: "block", margin: "15px auto", cursor: "pointer"}}
                             onClick={() => handleSHowDetails(details)}
                             icon={"carbon:view-filled"} width={24} height={24}/>
                </IconButton>
            </Tooltip>
        </RootStyle>
    )
}


const UserReport = () => {
    const [openModal, setOpenModal] = useState(false);
    const {data, loading} = useSelector((state) => state.reportUserSlice)
    const [types, setTypes] = useState("");
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {id} = useParams();

    console.log(data, "this is Fucking Test")
    useEffect(() => {
        dispatch(reportUserAction({id, withDetail: openModal}))
    }, [openModal]);
    const dir = t("dir") === "rtl";

    const handleSHowDetails = (value) => {
        setTypes(value)
        setOpenModal(true);
    }

    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Page title={"Kms | User_Report"}>
                <Box display={"flex"} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {t("User_Report")}
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/dashboard/customer/workspace/${id}`}
                        startIcon={<Iconify icon="ant-design:arrow-left-outlined"/>}
                    >
                        {t("Back")}
                    </Button>
                </Box>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"drives"} handleSHowDetails={handleSHowDetails} color={"error"}
                              icon={"ph:hard-drives-fill"} title={t('drives')}
                              count={data?.drives?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"articles"} handleSHowDetails={handleSHowDetails} color={"success"}
                              icon={"ooui:articles-rtl"} title={t('articles')}
                              count={data?.articles?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"wikis"} handleSHowDetails={handleSHowDetails} color={"warning"}
                              icon={"fontisto:wikipedia"} title={t('wikis')}
                              count={data?.wikis?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"likes_count"} handleSHowDetails={handleSHowDetails} color={"info"}
                              icon={"bxs:like"}
                              title={t('likes_count')}
                              count={data?.likes_count?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"dislikes_count"} handleSHowDetails={handleSHowDetails} color={"gray"}
                              icon={"ant-design:dislike-filled"} title={t('dislikes_count')}
                              count={data?.dislikes_count?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"comments_count"} handleSHowDetails={handleSHowDetails} color={"error"}
                              icon={"prime:comments"} title={t('comments_count')}
                              count={data?.comments_count?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"replies_count"} handleSHowDetails={handleSHowDetails} color={"info"}
                              icon={"ic:round-replay"} title={t('replies_count')}
                              count={data?.replies_count?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"article_read_count"} handleSHowDetails={handleSHowDetails} color={"warning"}
                              icon={"ooui:article-redirect-rtl"} title={t('article_read_count')}
                              count={data?.article_read_count?.count}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Item details={"wiki_read_count"} handleSHowDetails={handleSHowDetails} color={"success"}
                              icon={"arcticons:spell4wiki"} title={t('wiki_read_count')}
                              count={data?.wiki_read_count?.count}/>
                    </Grid>
                </Grid>
            </Page>
            {openModal && <ModalReport types={types} openModal={openModal} setOpenModal={setOpenModal}/>}
        </>
    );
};
export default UserReport;
