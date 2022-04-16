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

import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Http} from "../helper";
import {PaginationCore, LoadingCore} from "../core";
import {getWorkspaceList} from "../redux/features/admin/workspace";
import {Iconify} from "../components";
import WorkSpaceMenu from "../sections/@dashboard/workspace/WorkSpaceMenu";
import StoreWorkSpace from "../containers/admin/workspace/storeWorkSpace";
import UpdateWorkSpace from "../containers/admin/workspace/updateWorkSpace";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'type', label: 'type', alignRight: false},
    {id: 'title', label: 'Title', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];

// ----------------------------------------------------------------------

export default function WorkSpace() {
    const [page, setPage] = useState(1);
    const [workspaceList, setWorkspaceList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState({modal: false, id: null});

    const perPage = 10;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getWorkspaceListSlice);
    const {isSuccess} = useSelector((state) => state.storeWorkSpaceSlice);

    useEffect(() => {
        dispatch(getWorkspaceList())
    }, [])
    useEffect(() => {
        setWorkspaceList(data?.data)
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
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:plus-fill"/>}
                >
                    {t("New")}
                </Button>
                <Typography variant="h4" gutterBottom>
                    {t("workSpace")}
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
                            {TABLE_HEAD.map((cell, index) => (
                                <TableCell align={dir ? "right" : "left"} key={cell.id + index}>
                                    {t(cell.label)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workspaceList?.map((row, i) => {
                            const {type, id, title} = row;
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
                                    <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{title}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <WorkSpaceMenu setWorkspaceList={setWorkspaceList}  setOpenUpdateModal={setOpenUpdateModal}
                                                       data={workspaceList}
                                                       id={id}/>
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
