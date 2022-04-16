import React, {useEffect} from 'react';
import ModalCore from "../../../core/ModalCore";
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    useMediaQuery
} from "@mui/material";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {storeEmailAction} from "../../../redux/features/admin/email/storeSlice";
import {updateEmailAction} from "../../../redux/features/admin/email/updateSlice";
import Iconify from "../../../components/Iconify";
import {Link as RouterLink} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import storeWorkSpaceSlice, {storeWorkSpaceAction} from "../../../redux/features/admin/workspace/storeWorkSpace";
import {getWorkspaceList} from "../../../redux/features/admin/workspace";


const StoreWorkSpace = ({openModal, setOpenModal}) => {
    const {t} = useTranslation();
    const matches = useMediaQuery('(max-width:600px)');
    const {loading,isSuccess} = useSelector((state) => state.storeWorkSpaceSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) return dispatch(getWorkspaceList());
    }, [isSuccess])

    const AccountSchema = Yup.object().shape({
        type: Yup.string().required(t("is_required")),
        title: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            type: "",
            title: "",
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            const totalData = {
                type: data.type,
                title: data.title
            }
            dispatch(storeWorkSpaceAction(data)).then(() => {
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
                            <Stack direction={matches ? "column" : "row"} gap={3} spacing={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="title"
                                    type="title"
                                    label={t("Title")}
                                    {...getFieldProps("title")}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                                <TextField
                                    fullWidth
                                    autoComplete="type"
                                    type="type"
                                    label={t("type")}
                                    {...getFieldProps("type")}
                                    error={Boolean(touched.type && errors.type)}
                                    helperText={touched.type && errors.type}
                                />
                            </Stack>
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

export default StoreWorkSpace;
