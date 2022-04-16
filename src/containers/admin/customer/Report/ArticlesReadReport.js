import React from 'react';
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Scrollbar from "../../../../components/Scrollbar";
import {BadgeAvatar, Label} from "../../../../components";
import Page from "../../../../components/Page";
import * as moment from "jalali-moment";

const TABLE_HEAD = [
    {id: 'type', label: 'type', alignRight: false},
    {id: 'rate', label: 'rate', alignRight: false},
    {id: 'created_at', label: 'created_at', alignRight: false},
    {id: 'updated_at', label: 'updated_at', alignRight: false},
    {id: 'active', label: 'active', alignRight: false},
];

const ArticlesReadReport = ({data}) => {
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

export default ArticlesReadReport;
