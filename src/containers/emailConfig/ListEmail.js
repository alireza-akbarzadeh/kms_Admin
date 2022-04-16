import {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate} from 'react-router-dom';
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
    Pagination
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../../sections/@dashboard/user';
//

import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getSmsList} from "../../redux/features/admin/sms/indexSlice";
import {Http} from "../../helper";
import {PaginationCore} from "../../core";
import * as moment from "jalali-moment";
import {deleteSmsAction} from "../../redux/features/admin/sms/deleteSlice";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'User_Name', alignRight: false},
    {id: 'company', label: 'password', alignRight: false},
    {id: 'company', label: 'host', alignRight: false},
    {id: 'company', label: 'port', alignRight: false},
    {id: 'isVerified', label: 'created_at', alignRight: false},
    {id: 'role', label: 'active', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];

// ----------------------------------------------------------------------

export default function ListEmail({setTab, emailConfig, setEmailConfig}) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getEmailListSlice);

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
            setEmailConfig(res?.data?.data?.data);
        }
    };

    const dir = t("dir") === "rtl";
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Config_email")}
                </Typography>
                <Button
                    onClick={() => setTab(state => ({...state, numberTab: 1}))}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill"/>}
                >
                    {t("New")}
                </Button>
            </Stack>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                "& th ": {
                                    borderBottom: "1px solid #dce0e4",
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
                            {emailConfig?.data?.map((row, i) => {
                                const {encryption, host, port, created_at, password, active, username, id} = row;
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
                                        <TableCell align={dir ? "right" : "left"}>{username}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>{password}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>{host}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>{port}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {moment
                                                .from(created_at, "en", "YYYY/M/D HH:mm")
                                                .format("YYYY-M-D HH:mm:ss")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Label
                                                variant="ghost"
                                                color={(active === 0 && 'error') || 'success'}
                                            >
                                                {active === 0 ? t("De_Active") : t("Active")}
                                            </Label>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <UserMoreMenu data={emailConfig?.data} id={id} setTab={setTab}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {/*{emptyRows > 0 && (*/}
                            {/*    <TableRow style={{height: 53 * emptyRows}}>*/}
                            {/*        <TableCell colSpan={6}/>*/}
                            {/*    </TableRow>*/}
                            {/*)}*/}
                        </TableBody>
                        {/*{isUserNotFound && (*/}
                        {/*    <TableBody>*/}
                        {/*        <TableRow>*/}
                        {/*            <TableCell align="center" colSpan={6} sx={{py: 3}}>*/}
                        {/*                <SearchNotFound searchQuery={"tets"}/>*/}
                        {/*            </TableCell>*/}
                        {/*        </TableRow>*/}
                        {/*    </TableBody>*/}
                        {/*)}*/}
                    </Table>
                </TableContainer>
            </Scrollbar>
            <PaginationCore>

                <Pagination
                    page={page}
                    dir={"ltr"}
                    onChange={handlePageChange}
                    count={Math.ceil(
                        emailConfig?.total / emailConfig?.per_page
                    )}
                    variant="outlined"
                    color="primary"
                    disabled={emailConfig?.total < 9}
                />
            </PaginationCore>
        </>
    );
}
