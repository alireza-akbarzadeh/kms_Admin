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
import {storeSmsAction} from "../../redux/features/admin/sms/storeSlice";
import {updateSmsAction} from "../../redux/features/admin/sms/updateSlice";
import {SwitchButton} from "../../components";

const CreteSms = ({setTab, tab, smsConfig}) => {
    const {t} = useTranslation();
    const {loading, isSuccess: createStatus} = useSelector((state) => state.storeSmsSlice);
    const {loading: updateLoading, isSuccess: updateStatus} = useSelector((state) => state.updateSmsSlice);
    const [option, setOption] = useState([]);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const filterData = smsConfig?.filter((i) => i.id === tab.id);

    useEffect(() => {
        setActive(filterData?.[0]?.active === 1);
    }, [])
    const handleChangeType = (e) => {
        setOption(e.target.value)
    }
    const AccountSchema = Yup.object().shape({
        number: Yup.string().required(t("is_required")),
        api_key: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            number: tab.id === null ? "" : filterData?.[0].number,
            api_key: tab.id === null ? " " : filterData?.[0].api_key,
        },
        validationSchema: AccountSchema,
        onSubmit: (data) => {
            const totalData = {
                number: data.number,
                api_key: data.api_key,
                type: option,
            }
            const updateData = {
                number: data.number,
                api_key: data.api_key,
                type: tab.id === null ? option : filterData?.[0].type,
                active: active ? 1 : 0,
            }
            dispatch(tab.id === null ? storeSmsAction({data: totalData}) : updateSmsAction({
                id: tab.id,
                data: updateData
            }));
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;
    const handleChangeStatus = (e) => {
        setActive(e.target.checked)
    }
    const optionData = [
        {value: "kavenegar", text: t("kavenegar")}
    ]
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    {t("Create_sms")}
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
                                    autoComplete="api_key"
                                    type="text"
                                    label={t("api_key")}
                                    {...getFieldProps("api_key")}
                                    error={Boolean(touched.api_key && errors.api_key)}
                                    helperText={touched.api_key && errors.api_key}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="number"
                                    type="number"
                                    label={t("Number")}
                                    {...getFieldProps("number")}
                                    error={Boolean(touched.number && errors.number)}
                                    helperText={touched.number && errors.number}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {filterData?.length > 0 ? (
                                        <SelectBox value={filterData?.length > 0 && filterData?.[0].type}
                                                   fullWidth={true}
                                                   data={optionData}
                                                   label={t("type")}
                                                   onChange={handleChangeType}/>
                                    ) :
                                    <SelectBox
                                        fullWidth={true}
                                        data={optionData}
                                        label={t("type")}
                                        onChange={handleChangeType}/>
                                }
                            </Grid>
                            {tab.id && (
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        dir={'ltr'}
                                        sx={{gap: 3}}
                                        control={<SwitchButton checked={active}
                                                               handleChange={handleChangeStatus}/>}
                                        label={t("active")}/>
                                </Grid>
                            )}
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

export default CreteSms;
