import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import getTeamListSlice, {getTeamList} from "../../../../redux/features/admin/workspace/geTteamList";
import {Http} from "../../../../helper";
import {LoadingCore, PaginationCore} from "../../../../core";
import {
    Badge,
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {BadgeAvatar, Label} from "../../../../components";
import ShowTeam from "./ShowTeam";
import * as  moment from "jalali-moment";

const TABLE_HEAD = [{
    id: 'Pic', label: 'Pic', alignRight: false
}, {id: 'Title', label: 'Title', alignRight: false}, {
    id: 'Description', label: 'Description', alignRight: false
}, {
    id: 'created_at', label: 'created_at', alignRight: false
}, {id: 'update_at', label: 'update_at', alignRight: false}, {
    id: 'active',
    label: 'active',
    alignRight: false
}, {id: 'Action', label: 'Action', alignRight: false},];
const Team = () => {
    const [page, setPage] = useState(1);
    const [teamData, setTeamData] = useState(null);
    const [openTab, setOpenTab] = useState({tab: 1, id: null});
    const {loading, data} = useSelector((state) => state.getTeamListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;

    useEffect(() => {
        dispatch(getTeamList(id))
    }, []);

    useEffect(() => {
        setTeamData(data)
    }, [data]);

    // Show Details Task
    const showDetails = (id) => {
        setOpenTab({tab: 2, id: id})
    }

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/teams/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setTeamData(res?.data?.data);
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
                        {teamData?.data?.map((row, i) => {
                            const {
                                id, avatar, title, description, created_at, updated_at, active,
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
                                <TableCell sx={{display: "flex", justifyContent: "flex-end"}}
                                           align={dir ? "right" : "left"}>
                                    <BadgeAvatar address={avatar} size={"md"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{title}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{description?.substring(0, 15)}...</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{moment(created_at, "YYYY-M-D HH:mm:ss").local("fa").format(("YYYY/M/D HH:mm:ss"))}</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{moment(updated_at, "YYYY-M_D HH:mm:ss").local("fa").format("YYYY/M/D HH:mm:ss")}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Label variant={"ghost"}
                                           color={active === 1 ? "success" : "error"}>{active === 1 ? t("Active") : t("De_Active")}</Label>
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
            {teamData?.total >= 10 && (<PaginationCore>
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
        </>) : (<ShowTeam data={teamData} currentID={id} openTab={openTab} setOpenTab={setOpenTab}/>)}
    </>);
};

export default Team;
