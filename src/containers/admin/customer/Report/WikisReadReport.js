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


const WikisReadReport = ({data}) => {
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    return (
        <div>
            WikisReadReportReadReport
        </div>
    );
};

export default WikisReadReport;
