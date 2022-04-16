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
import {restPassAction} from "../../redux/features/users/resetPassword";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        loading,
        errors: AuthError,
        isSuccess,
        data
    } = useSelector((state) => state.userProfile);
    const {t} = useTranslation();
    const dispatch = useDispatch();


    console.log(AuthError, "AuthError AuthError AuthError")


    const AccountSchema = Yup.object().shape({
        current_password: Yup.string().required(t("current_password_required")),
        new_password: Yup.string().required(t("new_password_required")),
        renew_password: Yup.string().required(t("renew_password_required")),
    })
    const formik = useFormik({
        initialValues: {
            current_password: "",
            new_password: "",
            renew_password: "",

        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            dispatch(restPassAction(data));
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    return (
        <Box mt={3}>
            <Paper elevation={2} sx={{padding: 2}}>
                <FormikProvider value={formik}>
                    <Form autoComplete={"off"} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="current_password"
                                    type="password"
                                    label={t("current_password")}
                                    {...getFieldProps("current_password")}
                                    error={Boolean(touched.current_password && errors.current_password)}
                                    helperText={touched.current_password && errors.current_password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="new_password"
                                    type="password"
                                    label={t("new_password")}
                                    {...getFieldProps("new_password")}
                                    error={Boolean(touched.new_password && errors.new_password)}
                                    helperText={touched.new_password && errors.new_password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="renew_password"
                                    type="password"
                                    label={t("renew_password")}
                                    {...getFieldProps("renew_password")}
                                    error={Boolean(touched.renew_password && errors.renew_password)}
                                    helperText={touched.renew_password && errors.renew_password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{display: 'flex', justifyContent: "flex-end"}}>
                                    <LoadingButton
                                        type="submit"
                                        size={"large"}
                                        variant="contained"
                                        loading={loading}
                                    >
                                        {t("Save_Changes")}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Paper>
        </Box>
    );
};

export default ChangePassword;
