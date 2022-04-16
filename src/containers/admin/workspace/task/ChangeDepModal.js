import React, {useEffect, useState} from 'react';
import {ModalCore, SelectBox} from "../../../../core";
import {useDispatch, useSelector} from "react-redux";
import {getDepartmentList} from "../../../../redux/features/admin/departeman/indexDepartment";
import {changeDepartmentTicketsAction} from "../../../../redux/features/admin/Tickets/ChangeDeperteman";
import {useTranslation} from "react-i18next";
import {LoadingButton} from "@mui/lab";
import {Box} from "@mui/material";

const ChangeModalDep = ({openModal, setOpenModal, ticketId}) => {
    const {data, loading} = useSelector((state) => state.getDepartmentListSlice)
    const [dep, setDep] = useState(null);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const CreateData = data?.map((dep) => {
        return {value: dep.id, text: dep.name}
    })
    console.log(data, "CreateData")
    useEffect(() => {
        dispatch(getDepartmentList())
    }, [])
    const handleChangeDep = (e) => {
        setDep(e.target.value);
    }
    const handleSubmit = () => {
        const data = {
            ticket_id: ticketId,
            department_id: dep
        }
        dispatch(changeDepartmentTicketsAction(data)).then(() => {
            setOpenModal(false)
        })
    }
    return (
        <div>
            <ModalCore title={t("Details")} size={"500px"} open={openModal} setOpen={setOpenModal}>
                <SelectBox fullWidth={true} data={CreateData} onChange={handleChangeDep}/>
                <Box sx={{width: "80%", margin: "0 auto", mt: 4}}>
                    <LoadingButton
                        fullWidth
                        onClick={handleSubmit}
                        type="submit"
                        size={"large"}
                        variant="contained"
                        loading={loading}
                    >
                        {t("Add_Department")}
                    </LoadingButton>
                </Box>
            </ModalCore>
        </div>
    );
};

export default ChangeModalDep;
