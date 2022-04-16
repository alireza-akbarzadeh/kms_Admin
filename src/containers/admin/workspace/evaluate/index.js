import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Http} from "../../../../helper";
import {LoadingCore, PaginationCore} from "../../../../core";
import {getEvaluateList} from "../../../../redux/features/admin/workspace/getEvaluateList";
import {Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {BadgeAvatar, Label} from "../../../../components";
import EvaluateDetails from "../evaluate/show";


const TABLE_HEAD = [{
    id: 'Pic', label: 'Pic', alignRight: false
},
    {id: 'Name', label: 'Name', alignRight: false}, {
    id: 'Email', label: 'Email', alignRight: false
}, {id: 'mobile', label: 'mobile', alignRight: false}, {id: 'UserName', label: 'UserName', alignRight: false},
    {id: 'Points', label: 'Points', alignRight: false},
    {id: 'Month', label: 'Month', alignRight: false}, {id: 'Year', label: 'Year', alignRight: false},
    {id: 'created_at', label: 'created_at', alignRight: false}, {id: 'Action', label: 'Action', alignRight: false},];
const UserEvaluate = () => {
    const [page, setPage] = useState(1);
    const [evaluateData, setEvaluateData] = useState(null);
    const [openTab, setOpenTab] = useState({tab: 1, id: null});
    const {loading, data} = useSelector((state) => state.getEvaluateListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;
    useEffect(() => {
        dispatch(getEvaluateList(id))
    }, []);

    useEffect(() => {
        setEvaluateData(data)
    }, [data]);

    // Show Details Task
    const showDetails = (id) => {
        setOpenTab({tab: 2, id: id})
    }

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/evaluates/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setEvaluateData(res?.data?.data);
        }
    };

    const dir = t("dir") === "rtl";
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
                                <TableCell sx={{display: "flex", justifyContent: "flex-end"}}
                                           align={dir ? "right" : "left"}>
                                    <BadgeAvatar address={user.avatar} size={"md"}/>
                                </TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{user.first_name + " " + user.last_name}</TableCell>

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
        </>) : (<EvaluateDetails data={evaluateData} currentID={id} openTab={openTab} setOpenTab={setOpenTab}/>)}
    </>);
};

export default UserEvaluate;
