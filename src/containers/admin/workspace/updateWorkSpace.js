import React, {useEffect} from 'react';
import ModalCore from "../../../core/ModalCore";
import {
    Box,
    Stack,
    TextField,
    useMediaQuery
} from "@mui/material";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {updateWorkSpaceAction} from "../../../redux/features/admin/workspace/updateWorkSpace";
import {getWorkspaceList} from "../../../redux/features/admin/workspace";


const UpdateWorkSpace = ({openModal, setOpenModal, id, data}) => {
    const {t} = useTranslation();
    const matches = useMediaQuery('(max-width:600px)');
    const {loading, isSuccess} = useSelector((state) => state.updateWorkSpaceSlice);

    const filterData = data?.filter(x => x.id === openModal.id);


    useEffect(() => {
        if (isSuccess) return dispatch(getWorkspaceList());
    }, [isSuccess])


    const dispatch = useDispatch();
    const AccountSchema = Yup.object().shape({
        type: Yup.string().required(t("is_required")),
        title: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            type: filterData[0]?.type,
            title: filterData[0]?.title,
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            const totalData = {
                id: openModal.id,
                type: data.type,
                title: data.title
            }
            dispatch(updateWorkSpaceAction(totalData)).then(() => {
                setOpenModal({modal: false})
            });
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;
    return (
        <div>
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
        </div>
    );
};

export default UpdateWorkSpace;
