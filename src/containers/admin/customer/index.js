import {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';
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
    Pagination, MenuItem, Select, InputLabel, FormControl, Link
} from '@mui/material';
// components

import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Http} from "../../../helper";
import {PaginationCore, LoadingCore} from "../../../core";
import {getWorkspaceList} from "../../../redux/features/admin/workspace";
import {BadgeAvatar, Iconify, Label, SwitchButton} from "../../../components";
import WorkSpaceMenu from "../../../sections/@dashboard/workspace/WorkSpaceMenu";
import StoreWorkSpace from "../../../containers/admin/workspace/storeWorkSpace";
import UpdateWorkSpace from "../../../containers/admin/workspace/updateWorkSpace";
import {getCustomerListAction} from "../../../redux/features/admin/customer";
import {changeStatusAction} from "../../../redux/features/admin/customer/changeStatusSlice";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'type', label: 'Pic', alignRight: false},
    {id: 'title', label: 'Title', alignRight: false},
    {id: 'type', label: 'type', alignRight: false},
    {id: 'type', label: 'Description', alignRight: false},
    {id: 'status', label: 'status', alignRight: false},
    {id: 'last_status', label: 'last_status', alignRight: false},
    {id: 'updated_at', label: 'updated_at', alignRight: false},
    {id: 'Details', label: 'Details', alignRight: false},
    {id: 'ChangeStatus', label: 'Change_Status', alignRight: false},
];

// ----------------------------------------------------------------------

export default function WorkSpaceList() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [workspaceList, setWorkspaceList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState({modal: false, id: null});

    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getCustomerListSlice);
    const {isSuccess} = useSelector((state) => state.changeStatusSlice);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getCustomerListAction())
    }, [])
    useEffect(() => {
        if (isSuccess) {
            dispatch(getCustomerListAction())
        }
    }, [isSuccess])

    useEffect(() => {
        setWorkspaceList(data)
    }, [data])
    ////Handle Page Change

    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `admin/customers/types?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setWorkspaceList(res?.data?.data);
        }
    };
    const dir = t("dir") === "rtl";
    const statusList = [
        {value: "accept", label: "تایید شده"},
        {value: "pending", label: "درحال بررسی"},
        {value: "reject", label: "رد شده"}
    ];
    const handleChange = (e, id) => {
        const status = e.target.value;
        dispatch(changeStatusAction({id, status}))
    }
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Customer_List")}
                </Typography>
            </Stack>
            <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
                <Table dir={"ltr"}>
                    <TableHead>
                        <TableRow sx={{
                            "& th ": {
                                borderBottom: "1px solid #dce0e4",
                            }
                        }}>
                            {TABLE_HEAD?.map((cell, index) => (
                                <TableCell align={dir ? "right" : "left"} key={cell.id + index}>
                                    {t(cell.label)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workspaceList.length > 0 && workspaceList?.map((row, i) => {
                            const {
                                type,
                                id,
                                title,
                                status,
                                expired_at,
                                last_status,
                                description,
                                logo,
                                updated_at
                            } = row;
                            return (
                                <TableRow
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
                                    <TableCell align={"center"} sx={{
                                        display: 'flex',
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start"
                                    }}>
                                        <BadgeAvatar address={logo} size={"md"}/>
                                    </TableCell>
                                    <TableCell
                                        onClick={status === "تایید شده" ? () => navigate(`/dashboard/customer/workspace/${id}`) : ""}
                                        align={dir ? "right" : "left"}>{title}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                    <TableCell
                                        align={dir ? "right" : "left"}>{description?.substring(0, 19)}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Label
                                            color={status === "درحال بررسی" ? "warning" : status === "تایید شده" ? "success" : "error"}>
                                            {status}
                                        </Label>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{last_status}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{updated_at}</TableCell>
                                    <TableCell sx={{cursor: "pointer"}} align={dir ? "right" : "left"}
                                               onClick={() => navigate(`/dashboard/customer/workspace/${id}`)}>
                                        <Link variant={"button"}>
                                            {t("Details")}
                                        </Link>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">{status}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="status"
                                                onChange={(e) => handleChange(e, id)}
                                            >
                                                {statusList?.map((s, i) => (
                                                    <MenuItem key={s.label + i} value={s.value}>{s.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {workspaceList?.total >= 10 && (
                <PaginationCore>
                    <Pagination
                        page={page}
                        dir={"ltr"}
                        onChange={handlePageChange}
                        count={Math.ceil(
                            data?.total / data?.per_page
                        )}
                        variant="outlined"
                        color="primary"
                        disabled={data?.total < 9}
                    />
                </PaginationCore>
            )}
            {openModal && (
                <StoreWorkSpace setOpenModal={setOpenModal} openModal={openModal}/>
            )}
            {openUpdateModal.modal && (
                <UpdateWorkSpace data={workspaceList} setOpenModal={setOpenUpdateModal}
                                 openModal={openUpdateModal}/>
            )}
        </>
    );
}
