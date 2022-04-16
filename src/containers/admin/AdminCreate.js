import React, {useState} from 'react';
// Formik
import {useFormik, Form, FormikProvider} from "formik";
import * as Yup from "yup";
// mui
import {Box, Container, Grid, IconButton, InputAdornment, Paper, Stack, TextField} from "@mui/material";
//components
import {BadgeAvatar} from "../../components";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from "@mui/lab";
import userProfile from "../../redux/features/users/profileSlice";
import UpdateProfile, {restUserNameAction} from "../../redux/features/users/UpdateProfile";
import registerAdmin, {registerAdminAction} from "../../redux/features/admin/registerAdminSlice";
import {chainPropTypes} from "@mui/utils";
//core
import {SelectBox} from "../../core"
import {Theme} from '@mui/material/styles';

const AdminCreate = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [option, setOption] = useState()

    const {loading} = useSelector((state) => state.registerAdmin)

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const AccountSchema = Yup.object().shape({
        first_name: Yup.string().required(t("is_required")),
        last_name: Yup.string().required(t("is_required")),
        phone: Yup.string().required(t("is_required")),
        address: Yup.string().required(t("is_required")),
        email: Yup.string().email(t("Email_must_be_a_valid_email_address")).required("is_required"),
        mobile: Yup.string().required(t("is_required")),
        password: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
            mobile: "",
            email: "",
            password: "",
            // avatar: avatar,
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            const totalData = {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                address: data.address,
                mobile: data.mobile,
                email: data.email,
                password: data.password,
                type: option
            }
            dispatch(registerAdminAction(totalData));
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const handleSelectType = (e) => {
        setOption(e.target.value)
    }

    const typeOption = [
        {text: t("operator"), value: "operator"},
        {text: t("manager"), value: "manager"}
    ]
    return (
        <Container maxWidth={"lg"} mt={3}>
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
                                    autoComplete="phone"
                                    type="tel"
                                    label={t("phone")}
                                    {...getFieldProps("phone")}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="mobile"
                                    type="tel"
                                    label={t("mobile")}
                                    {...getFieldProps("mobile")}
                                    error={Boolean(touched.mobile && errors.mobile)}
                                    helperText={touched.mobile && errors.mobile}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectBox fullWidth label={t("type")} onChange={handleSelectType} data={typeOption}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="password"
                                    type="password"
                                    label={t("Password")}
                                    {...getFieldProps("password")}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="email"
                                    type="email"
                                    label={t("Email")}
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
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
                        </Grid>
                        <Box mt={3} sx={{display: 'flex', justifyContent: "flex-end"}}>
                            <LoadingButton
                                type="submit"
                                size={"large"}
                                variant="contained"
                                loading={loading}
                            >
                                {t("Save_Changes")}
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </Paper>
        </Container>
    );
};

export default AdminCreate;
