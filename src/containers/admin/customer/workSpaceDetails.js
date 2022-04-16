import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerListAction} from "../../../redux/features/admin/customer";
import {Avatar, Box, Button, Chip, Container, Divider, Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import Iconify from "../../../components/Iconify";
import {useTranslation} from "react-i18next";
import Data from "../../../_mocks_/WorkSpace"

const WorkSpaceDetails = () => {
    const [tab, setTab] = useState(1);
    const matches = useMediaQuery("(max-width:576px)")
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            <Container maxWidth={"xl"}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
                    {/*<Box>*/}
                    {/*    <Box sx={{display: "flex", alignItems: "center", gap: 3}}>*/}
                    {/*        <Typography variant="h4" gutterBottom>*/}
                    {/*            {filterData[0]?.title}*/}
                    {/*        </Typography>*/}
                    {/*        <Chip label={filterData[0]?.type}/>*/}
                    {/*    </Box>*/}
                    {/*    <Divider sx={{mt: 1, mb: 2}}/>*/}
                    {/*    <Typography component={"p"} maxWidth={"480px"}>*/}
                    {/*        {filterData[0]?.description}*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/dashboard/customer/workspace`}
                        endIcon={<Iconify icon="eva:arrow-back-fill"/>}
                    >
                        {t("Back")}
                    </Button>
                </Stack>
                <Box mt={4}>
                    <Stack sx={{overflowX: "auto"}} direction={matches ? "column" : "row"} gap={1}>
                        {Data.map((work, i) => (
                            <Chip
                                key={work.id + i}
                                sx={{fontSize: 15, width: "100%", padding: 3, justifyContent: "space-between"}}
                                size={"medium"}
                                onClick={() => setTab(work.id)}
                                label={t(work.name)}
                                color={work.id === tab ? "primary" : "default"}
                                avatar={<Avatar>{work.url}</Avatar>}
                            />
                        ))}
                    </Stack>
                    {Data.map((work, i) => (
                        <Box key={work.id + i} sx={{width: "100%", mt: 5}}>
                            {tab === work.id ? work.component : null}
                        </Box>
                    ))}
                </Box>
            </Container>
        </div>
    );
};

export default WorkSpaceDetails;
