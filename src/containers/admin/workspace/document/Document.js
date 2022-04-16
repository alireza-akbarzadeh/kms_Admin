import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getDocumentList} from "../../../../redux/features/admin/workspace/geDocumentList";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {
    Button, Chip,
    Pagination,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";

import ShowDocument from "../document/ShowDocument";
import {BadgeAvatar, Label} from "../../../../components";
import {LoadingCore, PaginationCore} from "../../../../core";
import {Http} from "../../../../helper";


const TABLE_HEAD = [
    {id: 'Author', label: 'Author', alignRight: false},
    {
        id: 'Title',
        label: 'Title',
        alignRight: false
    },
    {id: 'type', label: 'type', alignRight: false},
    {id: 'visibility_type', label: 'visibility_type', alignRight: false},
    {id: 'Category', label: 'Category', alignRight: false},
    {id: 'date', label: 'date', alignRight: false},
    {id: 'status_type', label: 'status_type', alignRight: false},
    {id: 'rate', label: 'rate', alignRight: false},
    {id: 'Action', label: 'Action', alignRight: false}
];
const Document = () => {
    const [page, setPage] = useState(1);
    const [documentList, setDocumentList] = useState();
    const {data, loading} = useSelector((state) => state.getDocumentListSlice);
    const [openTab, setOpenTab] = useState({tab: 1, id: null});

    const dispatch = useDispatch();
    const {id} = useParams();
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    const perPage = 10;

    useEffect(() => {
        dispatch((getDocumentList(id)))
    }, []);

    useEffect(() => {
        setDocumentList(data)
    }, [data]);
    // Show Details Task
    const showDetails = (id) => {
        setOpenTab({tab: 2, id: id})
    }
    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/document/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setDocumentList(res?.data?.data);
        }
    };


    if (loading) return <LoadingCore loading={loading}/>
    return (<>
        {openTab.tab === 1 ? (<>
            <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
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
                        {documentList?.data?.map((row, i) => {
                            const {
                                title,
                                type,
                                category,
                                date,
                                is_New,
                                visibility_type,
                                status_type,
                                rate,
                                user
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
                                <TableCell sx={{display: "inline-flex", alignItems: "center", gap: 3}}
                                           align={dir ? "right" : "left"}>
                                    <Typography>
                                        {user.first_name + " " + user.last_name}
                                    </Typography>
                                    <BadgeAvatar address={user.avatar} size={"md"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{title}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Label
                                        color={visibility_type === "members" ? "default" : visibility_type === "everyone" ? "info" : "primary"}>
                                        {visibility_type === "members" ? t("members") : visibility_type === "everyone" ? t("everyone") : t("customer")}
                                    </Label>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{category}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{date}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Chip
                                        label={status_type === "published" ? t("published") : status_type === "waiting" ? t("waiting") : t("Rejected")}
                                        variant={"outlined"}
                                        color={status_type === "published" ? "success" : status_type === "waiting" ? "warning" : "error"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Button onClick={() => showDetails(id)} variant={"outlined"}
                                            color={"info"}>
                                        {t('Details')}
                                    </Button>
                                </TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {documentList?.total >= 10 && (<PaginationCore>
                <Pagination
                    page={page}
                    dir={"ltr"}
                    onChange={handlePageChange}
                    count={Math.ceil(data?.total / data?.per_page)}
                    variant="outlined"
                    color="primary"
                    disabled={data?.total < 9}
                />
            </PaginationCore>)}
        </>) : (<ShowDocument data={documentList} currentID={id} openTab={openTab} setOpenTab={setOpenTab}/>)}
    </>);
};

export default Document;
