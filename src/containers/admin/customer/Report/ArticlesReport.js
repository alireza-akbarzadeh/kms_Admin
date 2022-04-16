import React from 'react';
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Scrollbar from "../../../../components/Scrollbar";
import {BadgeAvatar, Label} from "../../../../components";
import Page from "../../../../components/Page";
import * as moment from "jalali-moment";

const TABLE_HEAD = [
    {id: 'title', label: 'Title', alignRight: false},
    {id: 'type', label: 'type', alignRight: false},
    {id: 'user_id', label: 'user_id', alignRight: false},
    {id: 'visibility', label: 'visibility', alignRight: false},
    {id: 'url', label: 'url', alignRight: false},
    {id: 'updated_at', label: 'updated_at', alignRight: false},
    {id: 'unique', label: 'unique', alignRight: false},
    {id: 'description', label: 'Description', alignRight: false},
    {id: 'deleted_at', label: 'deleted_at', alignRight: false},
    {id: 'created_at', label: 'created_at', alignRight: false},
    {id: 'active', label: 'active', alignRight: false},
];


const ArticlesReport = ({data}) => {
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
                                    title,
                                    type,
                                    user_id,
                                    visibility,
                                    url,
                                    updated_at,
                                    unique,
                                    description,
                                    deleted_at,
                                    created_at,
                                    active,
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
                                                {title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {user_id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {visibility}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                <img src={url} alt=""/>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {moment(updated_at, 'YYYY/M/D HH:mm').format('YYYY-M-D HH:mm:ss')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {unique}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {description?.substring(0, 10)} ....
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {deleted_at === null && "پاک نشده"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {moment(created_at, 'YYYY/M/D HH:mm').format('YYYY-M-D HH:mm:ss')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Typography fontSize={15} component={"span"} color={"text.secondary"}>
                                                {active === 1 ? (
                                                        <Label color={"success"}>{t("Active")}</Label>
                                                    ) :
                                                    <Label color={"error"}>{t("De_Active")}</Label>}
                                            </Typography>
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

export default ArticlesReport;
