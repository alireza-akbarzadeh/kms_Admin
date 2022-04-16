import React, {useEffect, useState} from 'react';
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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../sections/@dashboard/user';
//

import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getSmsList} from "../redux/features/admin/sms/indexSlice";
import {Http} from "../helper";
import {LoadingCore, PaginationCore} from "../core";
import * as moment from "jalali-moment";
import deleteSms from "../redux/features/admin/sms/deleteSlice";
import getFileListSlice, {getFileList} from "../redux/features/admin/file/fileIndexSlice";
import {deleteFileList} from "../redux/features/admin/file/deleteFiles";
import * as _ from "lodash";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'Pic', alignRight: false},
    {id: 'company', label: 'path', alignRight: false},
    {id: 'isVerified', label: 'name', alignRight: false},
    {id: 'Actions', label: 'used', alignRight: false},
    {id: 'isVerified', label: 'format', alignRight: false},
    {id: 'role', label: 'type', alignRight: false},
    {id: 'Actions', label: 'directory', alignRight: false},
    {id: 'Actions', label: 'used', alignRight: false},
];

// ----------------------------------------------------------------------

export default function FilesComponents() {
    const [fileData, setFileData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const perPage = 10;

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getFileListSlice);

    useEffect(() => {
        dispatch(getFileList())
    }, []);

    useEffect(() => {
        setFileData(data?.files)
    }, [data]);
    const handleChangePage = () => {
        setPage(page + 10)
    }
    const dir = t("dir") === "rtl";

    const handleDeleteFile = (url) => {
        let newState = _.cloneDeep(data?.files);
        console.log(newState, "newState")
        const newData = _.remove(newState, function (x) {
            return x?.url !== url;
        });
        setFileData(newData);
        dispatch(deleteFileList({url: url}))
    }
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
    }

    const getNum = () => {
        if (fileData?.length > 0){
            let a= {}
            let foo= []
            if (page === 1) {
                a =  {
                    from: 0,
                    to: 10
                }
            } else {
                a =  {
                    from: parseInt("".concat((page - 1), 1), 10),
                    to: parseInt("".concat(page, 0))
                }
            }
            for (let i = a.from; i <= a.to ; i++){
                foo.push(fileData[i])
            }
            return foo;
        }else{
            return []
        }
    }
    console.log(getNum())

    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Page title="Admin | Files">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            {t("Config_sms")}
                        </Typography>
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
                                    {getNum()?.map((row, i) => {
                                        const {url, path, name, format, type, directory, used} = row;
                                        return (
                                            <TableRow
                                                sx={{
                                                    "& td ": {
                                                        borderBottom: "1px solid #dce0e4",
                                                    },
                                                }}
                                                hover
                                                key={i}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell align={dir ? "right" : "left"}>
                                                    <Box sx={{width: 180, height: 180, borderRadius: 10}}>
                                                        <img src={url} alt=""/>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{path}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{name}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{format}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{directory}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>
                                                    {!used ? <Button
                                                        onClick={() => handleDeleteFile(url)}>delete</Button> : "استفاده شده"}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <PaginationCore>
                        <Pagination
                            page={page}
                            dir={"ltr"}
                            onChange={handlePageChange}
                            count={Math.ceil(
                                fileData?.length / perPage
                            )}
                            variant="outlined"
                            color="primary"
                            disabled={fileData?.length < 9}
                        />
                    </PaginationCore>
                </Container>
            </Page>
        </>
    );
}
