import React, {useEffect} from 'react';
import {Box, Button, Checkbox, Grid, Rating, Stack, Typography} from "@mui/material";
import {BadgeAvatar, Iconify, Label} from "../../../../components";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {showDocumentList} from "../../../../redux/features/admin/workspace/ShowDocumentList";
import {LoadingCore} from "../../../../core";

const ShowDocument = ({setOpenTab, openTab, currentID}) => {
    const {data, loading} = useSelector((state) => state.showDocumentListSlice)

    const dispatch = useDispatch();
    const {id} = useParams();
    const {t} = useTranslation();
    useEffect(() => {
        dispatch(showDocumentList({currentId: id, detailsId: openTab.id}))
    }, []);

    const dir = t("dir") === "rtl";

    if (loading) return <LoadingCore loading={loading}/>
    return (<>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                {t("Details_Document")}
            </Typography>
            <Button
                onClick={() => setOpenTab((state) => ({...state, tab: 1}))}
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-back-outline"/>}
            >
                {t("Back")}
            </Button>
        </Stack>
        <Grid mt={4} container spacing={6}>
            <Grid xs={12} sm={6}>
                <Stack gap={2} direction={"column"} mt={2}>
                    <Typography>
                        {t("Title")} : {data?.title}
                    </Typography>
                    <Typography>
                        {t("type")} : {data?.type}
                    </Typography>
                    <Typography>
                        {t("bookmark")} : <Checkbox size={"medium"} defaultChecked={data?.checked} disabled
                                                    icon={<Iconify icon={"eva:bookmark-outline"}/>}
                                                    checkedIcon={<Iconify icon={"eva:bookmark-fill"}/>}/>
                    </Typography>
                    <Typography>
                        {t("visibility_type")} :
                        <Label
                            color={data?.visibility_type === "members" ? "default" : data?.visibility_type === "everyone" ? "info" : "primary"}>
                            {data?.visibility_type === "members" ? t("members") : data?.visibility_type === "everyone" ? t("everyone") : t("customer")}
                        </Label>
                    </Typography>
                    <Typography>
                        {t("read_time")} : {data?.read_time}
                    </Typography>
                    <Typography>
                        {t("likes")} : {data?.likes}
                    </Typography>
                    <Typography>
                        {t("contribute")} : {data?.contribute}
                    </Typography>
                    <Typography>
                        {t("dislikes")} : {data?.dislikes}
                    </Typography>
                    <Typography>
                        {t("view")} : {data?.view}
                    </Typography>
                    <Typography>
                        {t("rate")} : <Rating name="half-rating-read" defaultValue={data?.rate} precision={0.5}
                                              readOnly/>

                    </Typography>
                    <Typography>
                        {t("is_deprecated")} :
                        <Label
                            color={data?.is_deprecated === 1 ? "error" : "default"}>
                            {data?.is_deprecated === 1 ? t("is_deprecated") : t("is_deprecated")}
                        </Label>
                    </Typography>
                    <Typography>
                        {t("active")} : {data?.active}
                        <Label
                            color={data?.active === 1 ? "success" : "error"}> {data?.active === 1 ? t("Active") : t("De_Active")}
                        </Label>
                    </Typography>
                    <Typography>
                        {t("is_public")} : {data?.is_public ? "Public" : "Privet"}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
                <Stack direction={"column"} gap={5}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 3}}>
                        <BadgeAvatar address={data?.user?.avatar} size={"md"}/>
                        <Typography>
                            {data?.user.first_name + " " + data?.user.last_name}
                        </Typography>
                    </Box>
                    <Typography>
                        {t("Tags")} : {data?.tags?.map((tag, i) => (<Label variant={"outlined"}
                                                                           sx={{
                                                                               color: "#000",
                                                                               backgroundColor: tag?.color,
                                                                               margin: "0 7px",
                                                                               padding: "15px"
                                                                           }}
                                                                           key={tag.id + i}>{tag?.title}</Label>))}
                    </Typography>

                    <Typography>
                        {t("Drives")} : {data?.drives?.map((Drive, i) => (<Label variant={"outlined"}
                                                                                 sx={{
                                                                                     color: "#000",
                                                                                     margin: "0 7px",
                                                                                     padding: "15px"
                                                                                 }}
                                                                                 key={Drive.id + i}>{Drive?.title}</Label>))}
                    </Typography>
                    <Typography>
                        {t("Project")} : {data?.projects?.map((project, i) => (<Label variant={"outlined"}
                                                                                      sx={{
                                                                                          color: "#000",
                                                                                          margin: "0 7px",
                                                                                          padding: "15px"
                                                                                      }}
                                                                                      key={project.id + i}>{project?.title}</Label>))}
                    </Typography>

                    <Typography>
                        {t("Task")} : {data?.tasks?.map((task, i) => (<Label variant={"outlined"}
                                                                             sx={{
                                                                                 color: "#000",
                                                                                 margin: "0 7px",
                                                                                 padding: "15px"
                                                                             }}
                                                                             key={task.id + i}>{task?.title}</Label>))}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography mt={5}>
            {t("Text")} : <Typography mt={4} dangerouslySetInnerHTML={{__html: data?.body}}/>
        </Typography>
    </>);
};

export default ShowDocument;
