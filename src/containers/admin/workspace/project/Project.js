import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import getProjectListSlice, {getProjectList} from "../../../../redux/features/admin/workspace/getProjectList";
import {Http} from "../../../../helper";
import {LoadingCore, PaginationCore} from "../../../../core";
import {
    Badge,
    Button, Chip, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {BadgeAvatar, Label} from "../../../../components";
import ShowTask from "../task/showtask";
import ShowProject from "./ShowProject";

const TABLE_HEAD = [{
    id: 'Pic', label: 'Pic', alignRight: false
}, {id: 'Title', label: 'Title', alignRight: false}, {
    id: 'start_time', label: 'start_time', alignRight: false
}, {id: 'end_time', label: 'end_time', alignRight: false}, {
    id: 'estimated_time', label: 'estimated_time', alignRight: false
}, {id: 'active', label: 'active', alignRight: false}, {id: 'Action', label: 'Action', alignRight: false},];
const Project = () => {
    const [page, setPage] = useState(1);
    const [projectData, setProjectData] = useState(null);
    const [openTab, setOpenTab] = useState({tab: 1, id: null});
    const {loading, data} = useSelector((state) => state.getProjectListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;
    useEffect(() => {
        dispatch(getProjectList(id))
    }, []);

    useEffect(() => {
        setProjectData(data)
    }, [data]);

    // Show Details Task
    const showDetails = (id) => {
        setOpenTab({tab: 2, id: id})
    }

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/projects/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setProjectData(res?.data?.data);
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
                        {projectData?.data?.map((row, i) => {
                            const {
                                id,
                                avatar,
                                title,
                                start_time,
                                estimated_time,
                                end_time,
                                active,
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
                                <TableCell align={dir ? "right" : "left"}>{start_time}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{end_time}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{estimated_time}</TableCell>
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
            {projectData?.total >= 10 && (<PaginationCore>
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
        </>) : (<ShowProject data={projectData} currentID={id} openTab={openTab} setOpenTab={setOpenTab}/>)}
    </>);
};

export default Project;
