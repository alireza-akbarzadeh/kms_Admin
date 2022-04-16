import React, {useEffect, useState} from 'react';
import {
    Button,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Iconify, Label} from "../../../components";
import WorkSpaceMenu from "../../../sections/@dashboard/workspace/WorkSpaceMenu";
import {LoadingCore, PaginationCore} from "../../../core";
import {useDispatch, useSelector} from "react-redux";
import {getDepartmentList} from "../../../redux/features/admin/departeman/indexDepartment";
import {Http} from "../../../helper";
import {useTranslation} from "react-i18next";
import {CreateDeparteman} from "../../index";

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'status', label: 'status', alignRight: false},
    {id: 'Details', label: 'Details', alignRight: false},
];
const GetDepartment = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getDepartmentListSlice);
    const {isSuccess} = useSelector((state) => state.storeDepartmentSlice);


    const {t} = useTranslation();
    const dir = t("dir") === "rtl";

    useEffect(() => {
        dispatch(getDepartmentList())
    }, [isSuccess]);
    useEffect(() => {
        setDepartmentList(data)
    }, [data])

    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={5}>
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
                    {t("Department")}
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
                        {departmentList?.length > 0 && departmentList?.map((row, i) => {
                            const {name, id, active} = row;
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
                                    <TableCell align={dir ? "right" : "left"}>{name}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Label color={active === "1" ? "success" : "error"}>
                                            {active === "1" ? t("Active") : t("De_Active")}
                                        </Label>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Button
                                            onClick={() => navigate(`/dashboard/Department/${id}`, {state: {value: departmentList}})}>{t("Details")}</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <CreateDeparteman openModal={openModal} setOpenModal={setOpenModal}/>}
        </>
    );
};

export default GetDepartment;
