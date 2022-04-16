import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {showDriveList} from "../../../redux/features/admin/Drive/Show";
import {IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {LoadingCore, PaginationCore} from "../../../core";
import {useTranslation} from "react-i18next";
import {DownloadFIle, Http} from "../../../helper";
import {BadgeAvatar, Icons, Label} from "../../../components";

const TABLE_HEAD = [
    {id: 'Pic', label: 'Pic', alignRight: false},
    {id: 'first_name', label: 'first_name', alignRight: false},
    {id: 'Email', label: 'Email', alignRight: false},
    {id: 'mobile', label: 'mobile', alignRight: false},
    {id: 'UserName', label: 'UserName', alignRight: false},
    {id: 'sick_leave', label: 'sick_leave', alignRight: false},
    {id: 'earned_leave', label: 'earned_leave', alignRight: false},
    {id: 'leave_requests', label: 'leave_requests', alignRight: false},
    {id: 'study_time_requests', label: 'study_time_requests', alignRight: false},
    {id: 'arrival_requests', label: 'arrival_requests', alignRight: false},
    {id: 'unique', label: 'unique', alignRight: false},
    {id: 'Title', label: 'Title', alignRight: false},
    {id: 'visibility_type', label: 'visibility_type', alignRight: false},
    {id: 'visibility', label: 'visibility', alignRight: false},
    {id: 'type', label: 'type', alignRight: false},
    {id: 'active', label: 'active', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];

const Drive = () => {
    const [page, setPage] = useState(1);
    const [driveData, setDriveData] = useState(null);
    const {data, loading} = useSelector((state) => state.showDriveListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;

    useEffect(() => {
        dispatch(showDriveList(id))
    }, []);

    useEffect(() => {
        setDriveData(data)
    }, [data]);


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
            setDriveData(res?.data?.data);
        }
    };

    const dir = t("dir") === "rtl";
    if (loading) return <LoadingCore loading={loading}/>
    return (
        <div>
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
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {driveData?.data?.map((row, i) => {
                            const {
                                user,
                                id,
                                unique,
                                title,
                                description,
                                visibility_type,
                                visibility,
                                type,
                                active,
                                url,
                                file
                            } = row
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
                                    <TableCell align={dir ? "right" : "left"}>
                                        <BadgeAvatar size={"md"} address={user.avatar}/>
                                    </TableCell>
                                    <TableCell
                                        align={dir ? "right" : "left"}>{user.first_name + " " + user.last_name}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.mobile}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.username}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.sick_leave}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.earned_leave}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.leave_requests}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.study_time_requests}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{user.arrival_requests}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{unique}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{title}</TableCell>
                                    {/*<TableCell align={dir ? "right" : "left"}>{description}</TableCell>*/}
                                    <TableCell align={dir ? "right" : "left"}>{visibility_type}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{visibility}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Label variant={"ghost"}
                                               color={active === 1 ? "success" : "error"}>{active === 1 ? t("Active") : t("De_Active")}</Label>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <IconButton onClick={() => DownloadFIle(title, file)}>
                                            <Icons option={"et:download"}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {driveData?.total >= 10 && (
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
        </div>
    );
};

export default Drive;
