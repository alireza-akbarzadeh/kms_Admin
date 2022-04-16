import {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate, useNavigate, useParams} from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination, TableSortLabel, Box, TableHead,
    Pagination, IconButton
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../../../sections/@dashboard/user';
//

import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Http} from "../../../helper";
import {LoadingCore} from "../../../core";
import {workSpaceUserAction} from "../../../redux/features/admin/customer/user/workSpaceUserSlice";
import {BadgeAvatar} from "../../../components";
import {loginWithUserID} from "../../../redux/features/Auth/loginWithUserId";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'user', alignRight: false},
    {id: 'name', label: 'UserName', alignRight: false},
    {id: 'company', label: 'Email', alignRight: false},
    {id: 'company', label: 'mobile', alignRight: false},
    {id: 'company', label: 'date', alignRight: false},
    {id: 'company', label: 'type', alignRight: false},
    {id: 'user_Evaluate', label: 'user_Evaluate', alignRight: false},
    {id: 'company', label: 'sick_leave', alignRight: false},
    {id: 'isVerified', label: 'earned_leave', alignRight: false},
    {id: 'role', label: 'leave_requests', alignRight: false},
    {id: 'study_time_requests', label: 'study_time_requests', alignRight: false},
    {id: 'arrival_requests', label: 'arrival_requests', alignRight: false},
    {id: 'Actions', label: 'created_at', alignRight: false},
    {id: 'Login', label: 'Login_As', alignRight: false},
];

// ----------------------------------------------------------------------

export default function WokSpaceList() {
    const [page, setPage] = useState(1);
    const [workSpace, setWorkSpace] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.workSpaceUserSlice);
    const {data: authData} = useSelector((state) => state.loginWithUserSlice);
    const {id} = useParams();
    useEffect(() => {
        setWorkSpace(data)
    }, [data]);
    useEffect(() => {
        dispatch(workSpaceUserAction(id))
    }, []);


    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `admin/config/email?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setWorkSpace(res?.data?.data?.data);
        }
    };
    const handleLoginAsUser = (id) => {
        const data = {
            user_id: id
        };
        navigate("", {state: {value: 'authData'}});
        dispatch(loginWithUserID(data));
    }

    const dir = t("dir") === "rtl";
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <Page title={"Kms | User WorkSpace"}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                {/*<Typography variant="h4" gutterBottom>*/}
                {/*    {t("WorkSpace")}*/}
                {/*</Typography>*/}
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    component={RouterLink}*/}
                {/*    to={`/dashboard/customer/workspace/${id}`}*/}
                {/*    endIcon={<Iconify icon="eva:arrow-back-fill"/>}*/}
                {/*>*/}
                {/*    {t("Back")}*/}
                {/*</Button>*/}
            </Stack>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                "& th ": {
                                    borderBottom: "1px solid #dce0e4",
                                    whiteSpace: "nowrap"
                                }
                            }}>
                                {TABLE_HEAD.map((cell, index) => (
                                    <TableCell align={dir ? "right" : "left"} key={cell.id + index}>
                                        {t(cell.label)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workSpace?.length && workSpace?.map((row, i) => {
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
                                } = row;
                                return (
                                    <TableRow
                                        sx={{
                                            "& td ": {
                                                borderBottom: "1px solid #dce0e4",
                                            },
                                        }}
                                        hover
                                        key={created_at + i}
                                        tabIndex={-1}
                                        role="checkbox"
                                    >
                                        <TableCell sx={{
                                            display: "inline-flex",
                                            gap: 2,
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            whiteSpace: "nowrap"
                                        }}
                                                   align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {first_name + " " + last_name}
                                            </Typography>
                                            <BadgeAvatar address={avatar} align={"picture"} badge={false} size={"sm"}/>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {username}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {email}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {mobile}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {today}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {type?.map((item, i) => (
                                                <Typography key={item + i}>
                                                    {item}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <IconButton component={RouterLink}
                                                        to={`/dashboard/customer/user-Report/${id}`}>
                                                <Iconify icon={"carbon:chart-evaluation"}/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {sick_leave}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {earned_leave}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {leave_requests}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {study_time_requests}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {arrival_requests}
                                        </TableCell>
                                        <TableCell sx={{whiteSpace: "nowrap"}} align={dir ? "right" : "left"}>
                                            {created_at.dashDate + " -- " + created_at.time}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <RouterLink to={{
                                                pathname: `https://deriko.net/sigin-withId`,
                                                state: {value: authData}
                                            }} target={"_blank"}
                                                        onClick={() => handleLoginAsUser(id)}
                                                        variant={"outlined"}>{t("Login")}</RouterLink>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Page>
    );
}
