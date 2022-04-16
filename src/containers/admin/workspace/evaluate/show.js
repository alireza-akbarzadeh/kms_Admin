import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {LoadingCore, PaginationCore} from "../../../../core";
import {showEvaluateList} from "../../../../redux/features/admin/workspace/showEvaluateList";
import {Link as RouterLink, useParams} from "react-router-dom";
import {Http} from "../../../../helper";
import {
    Button,
    Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {BadgeAvatar, Label} from "../../../../components";
import Iconify from "../../../../components/Iconify";
import Scrollbar from "../../../../components/Scrollbar";

const TABLE_HEAD = [
    {id: 'Manger', label: 'Manger', alignRight: false},
    {id: 'Manger_Email', label: 'Manger_Email', alignRight: false},
    {id: 'Manger_Phone', label: 'Manger_Phone', alignRight: false},
    {id: 'Manger_UserName', label: 'Manger_UserName', alignRight: false},
    {id: 'User', label: 'User', alignRight: false},
    {id: 'Email', label: 'Email', alignRight: false},
    {id: 'mobile', label: 'mobile', alignRight: false},
    {id: 'UserName', label: 'UserName', alignRight: false},
    {id: 'Points', label: 'Points', alignRight: false},
    {id: 'Month', label: 'Month', alignRight: false},
    {id: 'Year', label: 'Year', alignRight: false},
    {id: 'created_at', label: 'created_at', alignRight: false},
];

const EvaluateDetails = ({openTab, setOpenTab, currentID}) => {
    const [page, setPage] = useState(1);
    const [evaluateData, setEvaluateData] = useState(null);
    const {loading, data} = useSelector((state) => state.getEvaluateListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;
    useEffect(() => {
        dispatch(showEvaluateList({currentId: currentID, detailsId: openTab.id}))
    }, []);

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/evaluates/index/${currentID}/${openTab.id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setEvaluateData(res?.data?.data);
        }
    };

    useEffect(() => {
        setEvaluateData(data)
    }, [data]);


    console.log(evaluateData, "mmad")

    const dir = t("dir") === "rtl";
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <>
            <Button
                sx={{mb: 3}}
                variant="contained"
                onClick={() => setOpenTab((state) => ({...state, tab: 1}))}
                endIcon={<Iconify icon="ant-design:arrow-left-outlined"/>}
            >
                {t("Back")}
            </Button>

            <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
                <Scrollbar>
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
                            {evaluateData?.data?.map((row, i) => {
                                const {
                                    id,
                                    points,
                                    user,
                                    manager,
                                    month, year,
                                    active,
                                } = row
                                console.log(row, "row")
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
                                    <TableCell sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        gap: 0.5
                                    }}
                                               align={dir ? "right" : "left"}>
                                        <Typography>
                                            {manager.first_name + " " + manager.last_name}
                                        </Typography>
                                        <BadgeAvatar address={manager.avatar} size={"md"}/>
                                    </TableCell>

                                    <TableCell align={dir ? "right" : "left"}>{manager.email}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{manager.mobile}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{manager.username}</TableCell>
                                    <TableCell sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        gap: 0.5
                                    }}
                                               align={dir ? "right" : "left"}>
                                        <Typography>
                                            {manager.first_name + " " + manager.last_name}
                                        </Typography>
                                        <BadgeAvatar address={manager.avatar} size={"md"}/>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.email}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.mobile}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.username}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Label variant={"ghost"}
                                               color={"secondary"}>{points}</Label>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{year}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{month}</TableCell>
                                    <TableCell
                                        align={dir ? "right" : "left"}>{user.created_at?.date + " " + user.created_at?.time}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
            {evaluateData?.total >= 10 && (<PaginationCore>
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
        </>
    );
};

export default EvaluateDetails;
