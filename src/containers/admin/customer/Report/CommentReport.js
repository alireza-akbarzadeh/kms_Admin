import React from 'react';
import {useTranslation} from "react-i18next";
import Scrollbar from "../../../../components/Scrollbar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import * as moment from "jalali-moment";
import {Label} from "../../../../components";

const TABLE_HEAD = [
    {id: 'text', label: 'text', alignRight: false},
    {id: 'type', label: 'type', alignRight: false},
    {id: 'status', label: 'status', alignRight: false},
    {id: 'created_at', label: 'created_at', alignRight: false},
    {id: 'updated_at', label: 'updated_at', alignRight: false},
    {id: 'active', label: 'active', alignRight: false},
];
const CommentReport = ({data}) => {
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    return (
        <div>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                "& th ": {
                                    borderBottom: "1px solid #dce0e4",
                                    whiteSpace: "nowrap"
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
                            {data && data?.detail?.map((row, i) => {
                                const {
                                    type,
                                    text,
                                    status,
                                    active,
                                    updated_at,
                                    created_at,
                                } = row;
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
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {text.substring(0, 10)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {status === "accept" ? t("Approve") : status === "Reject" ? t("Reject") : t("waiting")}
                                        </TableCell>

                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {moment(updated_at, 'YYYY/M/D HH:mm').format('YYYY-M-D HH:mm:ss')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {moment(created_at, 'YYYY/M/D HH:mm').format('YYYY-M-D HH:mm:ss')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Label color={active === 1 ? "success" : "error"}>
                                                {active === 1 ? t("Active") : t("De_Active")}
                                            </Label>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </div>
    );
};

export default CommentReport;
