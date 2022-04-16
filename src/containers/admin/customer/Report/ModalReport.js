import React, {useEffect, useState} from 'react';
import {ModalCore} from "../../../../core";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {reportUserAction} from "../../../../redux/features/admin/customer/report/userReportSlice";
import {Box} from "@mui/material";
import DriveReport from "./DriveReport"
import ArticlesReport from "./ArticlesReport";
import WikisReport from "./WikisReport";
import LikesReport from "./LikesReport";
import DisLikesReport from "./DisLikesReport";
import CommentReport from "./CommentReport";
import ReplayReport from "./ReplayReport";
import ArticlesReadReport from "./ArticlesReadReport";
import WikisReadReport from "./WikisReadReport";

const ModalReport = ({openModal, setOpenModal, types: main}) => {
    const [details, setDetails] = useState(null);
    const {data, loading} = useSelector((state) => state.reportUserSlice)
    const dispatch = useDispatch();
    const {t} = useTranslation();

    let filterData = main === "articles" ? data?.articles :
        main === "drives" ? data?.drives : main === "wikis" ? data?.wikis : main === "likes_count" ? data?.likes_count
            : main === "dislikes_count" ? data?.dislikes_count : main === "comments_count" ? data?.comments_count :
                main === "replies_count" ? data?.replies_count : main === "article_read_count" ? data?.article_read_count :
                    main === "wiki_read_count" ? data?.wiki_read_count : [];


    useEffect(() => {
        setDetails(filterData)
    }, []);

    const dir = t("dir") === "rtl";
    return (
        <>
            <ModalCore title={t("Details")} size={"1300px"} open={openModal} setOpen={setOpenModal}>
                <Box>
                    {main === "drives" ? <DriveReport data={details}/> : main === "articles" ?
                        <ArticlesReport data={details}/> : main === "wikis" ?
                            <WikisReport data={details}/> : main === "likes_count" ?
                                <LikesReport data={details}/> : main === "dislikes_count" ?
                                    <DisLikesReport data={details}/> : main === "comments_count" ?
                                        <CommentReport data={details}/> : main === "replies_count" ?
                                            <ReplayReport data={details}/> : main === "article_read_count" ?
                                                <ArticlesReadReport data={details}/> :
                                                main === "wiki_read_count" ? <WikisReadReport data={details}/> : null}
                </Box>
            </ModalCore>
        </>
    );
};

export default ModalReport;
