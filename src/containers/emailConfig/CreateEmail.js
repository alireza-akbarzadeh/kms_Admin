import React, {useEffect, useState} from 'react';
import {Box, Button, FormControlLabel, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Iconify from "../../components/Iconify";
import {useTranslation} from "react-i18next";
import {Form, FormikProvider, useFormik} from "formik";
import {SelectBox} from "../../core";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {storeEmailAction} from "../../redux/features/admin/email/storeSlice";
import {updateEmailAction} from "../../redux/features/admin/email/updateSlice";
import {SwitchButton} from "../../components";

const CreteEmail = ({setTab, tab, emailConfig}) => {
    const [option, setOption] = useState([]);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {loading, isSuccess: createStatus} = useSelector((state) => state.storeEmailSlice);
    const {loading: updateLoading, isSuccess: updateStatus} = useSelector((state) => state.updateEmailSlice);
    const filterData = emailConfig?.filter((i) => i.id === tab.id);

    useEffect(() => {
        setActive(filterData?.[0]?.active === 1);
    }, [])

    const handleChangeType = (e) => {
        setOption(e.target.value)
    }
    const AccountSchema = Yup.object().shape({
        host: Yup.string().required(t("is_required")),
        port: Yup.string().required(t("is_required")),
        password: Yup.string().required(t("is_required")),
        username: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            host: tab.id === null ? "" : filterData?.[0]?.host,
            port: tab.id === null ? "" : filterData?.[0]?.port,
            encryption: tab.id === null ? "" : active ? "tls" : null,
            password: tab.id === null ? "" : filterData?.[0]?.password,
            username: tab.id === null ? "" : filterData?.[0]?.username,
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            const totalData = {
                host: data.host,
                port: data.port,
                encryption: active ? "tls" : null,
                password: data.password,
                username: data.username,
            }
            dispatch(tab.id === null ? storeEmailAction({data: totalData}) : updateEmailAction({
                id: tab.id,
                data: totalData
            }));
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleChangeStatus = (e) => {
        setActive(e.target.checked)
    }

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Create_email")}
                </Typography>
                <Button
                    onClick={() => setTab({numberTab: 0, id: null})}
                    variant="contained"
                    endIcon={<Iconify icon="akar-icons:arrow-left"/>}
                >
                    {t("Back")}
                </Button>
            </Stack>
            <Paper elevation={2} sx={{padding: 2}}>
                <FormikProvider value={formik}>
                    <Form autoComplete={"off"} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="host"
                                    type="text"
                                    label={t("host")}
                                    {...getFieldProps("host")}
                                    error={Boolean(touched.host && errors.host)}
                                    helperText={touched.host && errors.host}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="port"
                                    type="text"
                                    label={t("port")}
                                    {...getFieldProps("port")}
                                    error={Boolean(touched.port && errors.port)}
                                    helperText={touched.port && errors.port}
                                />
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
                                    autoComplete="username"
                                    type="username"
                                    label={t("User_Name")}
                                    {...getFieldProps("username")}
                                    error={Boolean(touched.username && errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    dir={'ltr'}
                                    sx={{gap: 3}}
                                    control={<SwitchButton checked={active}
                                                           handleChange={handleChangeStatus}/>}
                                    label={t("Encryption")}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} sx={{display: 'flex', justifyContent: "flex-end"}}>
                            <LoadingButton
                                type="submit"
                                size={"large"}
                                variant="contained"
                                loading={tab.id ? updateLoading : loading}
                            >
                                {t("Save_Changes")}
                            </LoadingButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </Paper>
        </>
    );
};

export default CreteEmail;
