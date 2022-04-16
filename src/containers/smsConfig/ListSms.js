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
import deleteSms from "../../redux/features/admin/sms/deleteSlice";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'type', alignRight: false},
    {id: 'company', label: 'api_key', alignRight: false},
    {id: 'isVerified', label: 'created_at', alignRight: false},
    {id: 'isVerified', label: 'Number', alignRight: false},
    {id: 'role', label: 'active', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];

// ----------------------------------------------------------------------

export default function ListSms({setTab, smsConfig, setSmsConfig}) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getSmsListSlice);

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `admin/config/sms?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setSmsConfig(res?.data?.data?.data);
        }
    };

    const dir = t("dir") === "rtl";
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Config_sms")}
                </Typography>
                <Button
                    onClick={() => setTab(state => ({...state, numberTab: 1}))}
                    variant="contained"
                    component={RouterLink}
                    to="#"
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
                            {smsConfig?.data?.map((row, i) => {
                                const {type, api_key, created_at, number, active, id} = row;
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
                                        <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                        <TableCell
                                            align={dir ? "right" : "left"}>{api_key?.substring(0, 10)}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {moment
                                                .from(created_at, "en", "YYYY/M/D HH:mm")
                                                .format("YYYY-M-D HH:mm:ss")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>{number}</TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Label
                                                variant="ghost"
                                                color={(active === 0 && 'error') || 'success'}
                                            >
                                                {active === 0 ? t("De_Active") : t("Active")}
                                            </Label>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <UserMoreMenu data={smsConfig?.data} id={id} setTab={setTab}/>
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
                        smsConfig?.total / smsConfig?.per_page
                    )}
                    variant="outlined"
                    color="primary"
                    disabled={smsConfig?.total < 9}
                />
            </PaginationCore>
        </>
    );
}
