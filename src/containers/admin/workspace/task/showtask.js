import React, {useEffect} from 'react';
import {
    Box,
    Button, Checkbox, Chip,
    Grid,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {BadgeAvatar, Iconify, Label} from "../../../../components";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {showTaskList} from "../../../../redux/features/admin/workspace/ShowTaskList";
import {LoadingCore} from "../../../../core";

const TABLE_HEAD = [
    {id: 'Pic', label: 'Pic', alignRight: false},
    {
        id: 'Name',
        label: 'Name',
        alignRight: false
    },
    {id: 'type', label: 'type', alignRight: false},
    {
        id: 'today',
        label: 'today',
        alignRight: false
    },
    {id: 'Email', label: 'Email', alignRight: false},
    {id: 'mobile', label: 'mobile', alignRight: false},
    {
        id: 'UserName',
        label: 'UserName',
        alignRight: false
    },
    {
        id: 'sick_leave',
        label: 'sick_leave',
        alignRight: false
    }, {id: 'earned_leave', label: 'earned_leave', alignRight: false}, {
        id: 'leave_requests',
        label: 'leave_requests',
        alignRight: false
    }, {id: 'study_time_requests', label: 'study_time_requests', alignRight: false}, {
        id: 'arrival_requests',
        label: 'arrival_requests',
        alignRight: false
    }, {id: 'created_at', label: 'created_at', alignRight: false}];

const ShowTask = ({openTab, setOpenTab, currentID}) => {
    const {data, loading} = useSelector((state) => state.showTaskListSlice)
    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showTaskList({currentId: currentID, detailsId: openTab.id}))
    }, []);


    const dir = t("dir") === "rtl";

    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Details_Task")}
                </Typography>
                <Button
                    onClick={() => setOpenTab((state) => ({...state, tab: 1}))}
                    variant="contained"
                    endIcon={<Iconify icon="eva:arrow-back-outline"/>}
                >
                    {t("Back")}
                </Button>
            </Stack>
            <Stack direction={"column"} gap={2}>
                <Typography>
                    {t("Category")} : {data?.category}
                </Typography>
                <Typography>
                    {t("Project")} : {data?.project}
                </Typography>
                <Typography>
                    {t("Title")} : {data?.title}
                </Typography>
                <Typography>
                    {t("Task_Type")} : {data?.is_knowledge ? t("Knowledge") : t("Task")}
                </Typography>
                <Typography>
                    {t("estimated_date")} : {data?.estimated_date}
                </Typography>
                <Typography>
                    {t("estimated_time")} : {data?.estimated_time}
                </Typography>
                <Typography>
                    {t("done_time")} : {data?.estimated_time}
                </Typography>
                <Typography>
                    {t("status")} :
                    <Label sx={{margin: "0 5px"}} variant={"ghost"}
                           color={data?.active === 1 ? "success" : "error"}>{data?.active === 1 ? t("Active") : t("De_Active")}</Label></Typography>
                <Typography>
                    {t("is_done")} :
                    <Label sx={{margin: "0 5px"}} variant={"filled"}
                           color={data?.is_don === 1 ? "success" : "error"}>{data?.is_don === 1 ? t("Don") : t("undone")}</Label>
                </Typography>
                <Typography lineHeight={2}>
                    {t("Description")} : {data?.description}
                </Typography>
            </Stack>

            <TableContainer sx={{minWidth: 800, border: "1px solid #eee", mt: 5}}>
                <Table dir={"ltr"}>
                    <TableHead>
                        <TableRow sx={{
                            "& th ": {
                                borderBottom: "1px solid #dce0e4",
                            }
                        }}>
                            {TABLE_HEAD.map((cell, index) => (
                                <TableCell sx={{whiteSpace: "nowrap"}} align={dir ? "right" : "left"}
                                           key={cell.id + index}>
                                    {t(cell.label)}
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users?.map((row, i) => {
                            const {
                                id,
                                type,
                                today,
                                avatar,
                                first_name,
                                last_name,
                                email,
                                mobile,
                                username,
                                sick_leave,
                                earned_leave,
                                leave_requests,
                                study_time_requests,
                                arrival_requests,
                                created_at
                            } = row
                            return (<TableRow
                                sx={{
                                    "& td ": {
                                        borderBottom: "1px solid #dce0e4",
                                    },
                                }}
                                hover
                                key={id + i}
                                tabIndex={-1}
                                role="checkbox"
                            >
                                <TableCell align={dir ? "right" : "left"}>
                                    <BadgeAvatar address={avatar} size={"md"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{first_name + " " + last_name}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{type?.map((item, i) => (
                                    <Typography key={item + i}>
                                        {item}
                                    </Typography>
                                ))}</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{today}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{email}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{mobile}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{username}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{sick_leave}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{earned_leave}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{leave_requests}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{study_time_requests}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{arrival_requests}</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{created_at.dashDate + " " + created_at.time}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {data?.detail?.map((item, index) => {
                const {id, title, done, active} = item;
                return (
                    <Stack direction={"column"} key={id + index} gap={1}>
                        <Box sx={{display: "flex", alignItems: 'center', gap: 2}}>
                            <Checkbox disabled checked={done === 1}/>
                            <Typography>{title}</Typography>
                        </Box>
                    </Stack>
                )
            })}
        </>
    );
};

export default ShowTask;
