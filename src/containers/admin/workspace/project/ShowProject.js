import React, {useEffect} from 'react';
import {
    Button, CardHeader, CardMedia,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {BadgeAvatar, Iconify, Label} from "../../../../components";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {showProjectList} from "../../../../redux/features/admin/workspace/ShowProjectList";
import {LoadingCore} from "../../../../core";
import moment from "jalali-moment";

const TABLE_HEAD = [
    {id: 'Pic', label: 'Pic', alignRight: false},
    {
        id: 'Name',
        label: 'Name',
        alignRight: false
    },
    {id: 'role', label: 'role', alignRight: false},
    {
        id: 'email',
        label: 'email',
        alignRight: false
    },
    {id: 'username', label: 'username', alignRight: false},
    {id: 'mobile', label: 'mobile', alignRight: false}];

const ShowProject = ({openTab, setOpenTab, currentID}) => {
    const {data, loading} = useSelector((state) => state.showProjectListSlice)
    const {t} = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showProjectList({currentId: currentID, detailsId: openTab.id}))
    }, []);

    const dir = t("dir") === "rtl";

    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Details_Project")}
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
                <CardMedia
                    component="img"
                    height="250"
                    sx={{borderRadius: 1}}
                    title={t("Team_Avatar")}
                    image={data?.team?.header}
                    alt="Team Avatar"
                />
                <Typography>
                    {t("Title")} : {data?.title}
                </Typography>
                <Typography>
                    {t("start_time")} : {data?.start_time}
                </Typography>
                <Typography>
                    {t("end_time")} : {data?.end_time}
                </Typography>
                <Typography>
                    {t("estimated_time")} : {data?.estimated_time}
                </Typography>
                <Typography>
                    {t("status")} :
                    <Label sx={{margin: "0 5px"}} variant={"ghost"}
                           color={data?.active === 1 ? "success" : "error"}>{data?.active === 1 ? t("Active") : t("De_Active")}</Label></Typography>
                <Typography lineHeight={2}>
                    {t("Description")} : {data?.description}
                </Typography>
                <Typography>
                    {t("Team_Title")} : {data?.team?.title}
                </Typography>
                <Typography>
                    {t("Team_Description")} : {data?.team?.description}
                </Typography>

                <Typography>
                    {t("status_Team")} :
                    <Label sx={{margin: "0 5px"}} variant={"ghost"}

                           color={data?.team?.active === 1 ? "success" : "error"}>{data?.team?.active === 1 ? t("Active") : t("De_Active")}</Label></Typography>
                <Typography>
                    {t("Team_created_at")} : {moment(data?.team?.created_at, 'YYYY-M-D HH:mm:ss').local("fa").format('YYYY/M/D HH:mm:ss')}
                </Typography>
                <Typography>
                    {t("Team_updated_at")} :{moment(data?.team?.updated_at, 'YYYY-M-D HH:mm:ss').local("fa").format('YYYY/M/D HH:mm:ss')}
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
                        {data?.team?.users?.map((row, i) => {
                            const {
                                id,
                                avatar,
                                role,
                                first_name,
                                last_name,
                                email,
                                username,
                                mobile,

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
                                <TableCell sx={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}
                                           align={dir ? "right" : "left"}>
                                    <BadgeAvatar address={avatar} size={"md"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{first_name + " " + last_name}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{role}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{email}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{mobile}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{username}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default ShowProject;
