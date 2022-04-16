import React, {useEffect, useState} from 'react';
import {LoadingCore} from "../../../core";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTicketsAction} from "../../../redux/features/admin/Tickets/index";
import {Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Label} from "../../../components";

const TABLE_HEAD = [
    {id: 'unique_number', label: 'unique_number', alignRight: false},
    {id: 'subject', label: 'subject', alignRight: false},
    {id: 'priority', label: 'priority', alignRight: false},
    {id: 'department', label: 'department', alignRight: false},
    {id: 'status', label: 'status', alignRight: false},
    {id: 'date', label: 'date', alignRight: false},
    {id: 'updated', label: 'updated', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];
const GetTicketList = () => {
    const [ticketList, setTicketList] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState({modal: false, id: null});
    const navigate = useNavigate()
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.getTicketsSlice);

    useEffect(() => {
        dispatch(getTicketsAction())
    }, [])
    useEffect(() => {
        setTicketList(data)
    }, [data])


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
                                <TableCell align={dir ? "right" : "left"} key={cell.id + index}>
                                    {t(cell.label)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data?.map((row, i) => {
                            const {
                                id,
                                unique_number,
                                subject,
                                priority,
                                department,
                                status,
                                status_type,
                                date,
                                updated
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
                                    <TableCell align={dir ? "right" : "left"}>{unique_number}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{subject}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Label
                                            color={priority === "بالا" ? "error" : priority === "متوسط" ? "warning" : "default"}
                                            variant={"ghost"}>
                                            {priority === "بالا" ? t("Up") : priority === "متوسط" ? "Medium" : "Low"}
                                        </Label>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Chip variant={"outlined"} color={"default"} label={department}/>
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{status}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{date}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{updated}</TableCell>
                                    <TableCell align={dir ? "right" : "left"}>
                                        <Button
                                            onClick={() => navigate(`/dashboard/ticket/${id}`, {state: {value: ticketList}})}>{t("Details")}</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default GetTicketList;
