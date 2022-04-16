import React, {useState} from 'react';
// Formik
import {useFormik, Form, FormikProvider} from "formik";
import * as Yup from "yup";
// mui
import {Box, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip} from "@mui/material";
//components
import {BadgeAvatar} from "../../components";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import userProfile from "../../redux/features/users/profileSlice";
import UpdateProfile, {restUserNameAction} from "../../redux/features/users/UpdateProfile";
import {FileUploader} from "../../helper";
import AddMessage from "../admin/Ticket/AddMessage";

const EditAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        loading, data
    } = useSelector((state) => state.userProfile);
    const {
        loading: loadingProfile, data: dataProfiel, error
    } = useSelector((state) => state.UpdateProfile);
    const {t} = useTranslation();
    const [logoPic, setLogoPic] = useState(null);
    const dispatch = useDispatch();
    const {address, avatar, first_name, last_name, phone, status} = data;
    const formData = new FormData();


    const AccountSchema = Yup.object().shape({
        first_name: Yup.string().required("FirstName_is_required"),
        last_name: Yup.string().required("FirstName_is_required"),
        phone: Yup.string().required("FirstName_is_required"),
        address: Yup.string().required("FirstName_is_required"), // avatar: Yup.string().required("FirstName_is_required"),
    })
    const formik = useFormik({
        initialValues: {
            first_name: first_name, last_name: last_name, phone: phone, address: address,
        }, validationSchema: AccountSchema, onSubmit: (data) => {
            const formData = new FormData();
            if (logoPic !== null) {
                formData.append("avatar", logoPic[0]);
            }
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("phone", data.phone);
            formData.append("address", data.address);
            dispatch(restUserNameAction(formData));
        },
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    return (<Box mt={3}>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
                <Paper elevation={2} sx={{padding: 2}}>
                    <Tooltip title={t("Update_Photo")}>
                        <div>
                            <FileUploader
                                src={logoPic}
                                onFileUpload={setLogoPic}
                                uploadMultiple={false}
                                showPreview={true}
                                title={t("PHOTO_SELECTION_KEY")}
                                description={t("NEED_CHANGE_IMAGE_KEY")}
                            >
                                <Box>
                                    <div className="wrap-custom-file">
                                        <label htmlFor="avatar">
                                            <Box
                                                sx={{
                                                    backgroundColor: "#fff",
                                                    borderRadius: 2,
                                                    padding: 0.5,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <BadgeAvatar address={avatar} size={"lg"}/>
                                            </Box>
                                        </label>
                                    </div>
                                </Box>
                            </FileUploader>
                        </div>
                    </Tooltip>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={7} alignItems={"center"}>
                <Paper elevation={2} sx={{padding: 2}}>
                    <FormikProvider value={formik}>
                        <Form autoComplete={"off"} noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        autoComplete="first_name"
                                        type="text"
                                        label={t("first_name")}
                                        {...getFieldProps("first_name")}
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        helperText={touched.first_name && errors.first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        autoComplete="last_name"
                                        type="text"
                                        label={t("last_name")}
                                        {...getFieldProps("last_name")}
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        helperText={touched.last_name && errors.last_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        autoComplete="address"
                                        type="text"
                                        label={t("address")}
                                        {...getFieldProps("address")}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        autoComplete="phone"
                                        type="tel"
                                        label={t("phone")}
                                        {...getFieldProps("phone")}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={5} sx={{display: 'flex', justifyContent: "flex-end"}}>
                                <LoadingButton
                                    type="submit"
                                    size={"large"}
                                    variant="contained"
                                    loading={loadingProfile}
                                >
                                    {t("Save_Changes")}
                                </LoadingButton>
                            </Box>
                        </Form>
                    </FormikProvider>
                </Paper>
            </Grid>
        </Grid>
    </Box>);
};

export default EditAccount;
