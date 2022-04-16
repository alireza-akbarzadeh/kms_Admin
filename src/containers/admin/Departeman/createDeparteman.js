import React from 'react';
import ModalCore from "../../../core/ModalCore";
import {Box, Stack, TextField, useMediaQuery} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import * as Yup from "yup";
import  {storeDepartmentAction} from "../../../redux/features/admin/departeman/StoreDepartment";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const StoreDepartment = ({openModal, setOpenModal}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {loading, isSuccess} = useSelector((state) => state.storeDepartmentSlice);
    const matches = useMediaQuery('(max-width:600px)');

    const AccountSchema = Yup.object().shape({
        name: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            dispatch(storeDepartmentAction(data)).then(() => {
                setOpenModal(false)
            });
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;
    return (
        <>
            <ModalCore title={t("Details")} size={"800px"} open={openModal} setOpen={setOpenModal}>
                <Box>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                autoComplete="name"
                                type="name"
                                label={t("Name")}
                                {...getFieldProps("name")}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Box mt={4}>
                                <LoadingButton
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={loading}
                                >
                                    {t("Save_Changes")}
                                </LoadingButton>
                            </Box>
                        </Form>
                    </FormikProvider>
                </Box>
            </ModalCore>
        </>
    );
};

export default StoreDepartment;
