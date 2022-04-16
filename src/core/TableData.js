import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {BadgeAvatar, Label} from "../components";
import * as moment from "jalali-moment";
import {useTranslation} from "react-i18next";

const TableData = ({Head, data}) => {
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    return (<>
        <TableContainer sx={{minWidth: 800, border: "1px solid #eee"}}>
            <Table dir={"ltr"}>
                <TableHead>
                    <TableRow sx={{
                        "& th ": {
                            borderBottom: "1px solid #dce0e4",
                        }
                    }}>
                        {Head?.map((cell, index) => (
                            <TableCell sx={{whiteSpace: "nowrap"}} align={dir ? "right" : "left"}
                                       key={cell.id + index}>
                                {t(cell.label)}
                            </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {/*    <Table ROw >     */}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
};

export default TableData;
