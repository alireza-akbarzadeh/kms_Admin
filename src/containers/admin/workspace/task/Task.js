import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getTaskList} from "../../../../redux/features/admin/workspace/GetTaskList";
import {DownloadFIle, Http} from "../../../../helper";
import {LoadingCore, PaginationCore} from "../../../../core";
import {
    Button, Chip, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {BadgeAvatar, Icons, Label} from "../../../../components";
import ShowTask from "./showtask";

const TABLE_HEAD = [{id: 'Title', label: 'Title', alignRight: false}, {
    id: 'Category',
    label: 'Category',
    alignRight: false
}, {id: 'Project', label: 'Project', alignRight: false}, {
    id: 'Description',
    label: 'Description',
    alignRight: false
}, {id: 'Task_Type', label: 'Task_Type', alignRight: false}, {
    id: 'estimated_date',
    label: 'estimated_date',
    alignRight: false
}, {id: 'estimated_time', label: 'estimated_time', alignRight: false}, {
    id: 'done_time',
    label: 'done_time',
    alignRight: false
}, {id: 'active', label: 'active', alignRight: false}, {
    id: 'is_done',
    label: 'is_done',
    alignRight: false
}, {id: 'Actions', label: 'Actions', alignRight: false},];


const Task = () => {
    const [page, setPage] = useState(1);
    const [taskData, setTaskData] = useState(null);
    const [openTab, setOpenTab] = useState({tab: 1, id: null});
    const {loading, data} = useSelector((state) => state.getTaskListSlice)
    const {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const perPage = 10;
    useEffect(() => {
        dispatch(getTaskList(id))
    }, []);

    useEffect(() => {
        setTaskData(data)
    }, [data]);

    // Show Details Task
    const showDetails = (id) => {
        setOpenTab({tab: 2, id: id})
    }

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`admin/customers/tasks/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setTaskData(res?.data?.data);
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
                        {taskData?.data?.map((row, i) => {
                            const {
                                id,
                                category,
                                project,
                                title,
                                description,
                                is_knowledge,
                                estimated_date,
                                estimated_time,
                                done_time,
                                is_don,
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
                                <TableCell align={dir ? "right" : "left"}>{category}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{project}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{title}</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{description.substring(0, 10)}....</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>
                                    <Chip label={is_knowledge ? t("knowledge_Task") : t('Task')}
                                          variant={"outlined"}/>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>{estimated_date}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>{estimated_time}</TableCell>
                                <TableCell
                                    align={dir ? "right" : "left"}>{!done_time ? "ندارد" : done_time}</TableCell>

                                <TableCell align={dir ? "right" : "left"}>
                                    <Label variant={"ghost"}
                                           color={active === 1 ? "success" : "error"}>{active === 1 ? t("Active") : t("De_Active")}</Label>
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Label variant={"filled"}
                                           color={is_don === 1 ? "success" : "error"}>{is_don === 1 ? t("Don") : t("undone")}</Label>
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
            {taskData?.total >= 10 && (<PaginationCore>
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
        </>) : (<ShowTask data={taskData} currentID={id} openTab={openTab} setOpenTab={setOpenTab}/>)}
    </>);
};

export default Task;
