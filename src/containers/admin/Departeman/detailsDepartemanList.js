import React, {useEffect, useState} from 'react';
import {Form, FormikProvider, useFormik} from "formik";
import {updateDepartmentAction} from "../../../redux/features/admin/departeman/UpdateDepartment";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import {BadgeAvatar, Iconify, Label, SwitchButton} from "../../../components";
import {LoadingCore} from "../../../core";
import {Link as RouterLink, useLocation, useParams} from "react-router-dom";
import {removeDepartmentAdminAction} from "../../../redux/features/admin/removeDepartemanSlice";
import {showDepartmentList} from "../../../redux/features/admin/departeman/ShowDepartment";
import storeDepartmentAdminSlice, {
    storeDepartmentAdminAction
} from "../../../redux/features/admin/departeman/storeDepartmentAdmin";
import {adminList} from "../../../redux/features/admin/departeman/adminListSlice";
import SelectBox from "../../../core/SelectBox";
import * as _ from "lodash";

const TABLE_HEAD = [
    {id: 'Avatar', label: 'Pic', alignRight: false},
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'email', label: 'Email', alignRight: false},
    {id: 'mobile', label: 'mobile', alignRight: false},
    {id: 'type', label: 'type', alignRight: false},
    {id: 'phone', label: 'phone', alignRight: false},
    {id: 'status', label: 'status', alignRight: false},
    {id: 'address', label: 'address', alignRight: false},
    {id: 'Active', label: 'Active', alignRight: false},
    {id: 'Actions', label: 'Actions', alignRight: false},
];
const DetailsDepartmentList = () => {
    const [check, setCheck] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [name, setName] = useState("");
    const {t} = useTranslation();
    const {state} = useLocation();
    const dispatch = useDispatch();
    const dir = t("dir") === "rtl";
    const {id} = useParams();
    const matches = useMediaQuery('(max-width:600px)');

    const {loading: updateLoad, isSuccess} = useSelector((state) => state.updateDepartmentSlice);
    const {data, loading} = useSelector((state) => state.showDepartmentListSlice);
    const {data: AdminList} = useSelector((state) => state.adminListSlice);
    const {isSuccess: adminIsSuccess} = useSelector((state) => state.storeDepartmentAdminSlice);


    useEffect(() => {
        dispatch(adminList({department: parseInt(id), isPaginate: 0}))
    }, []);
    useEffect(() => {
        dispatch(showDepartmentList(id))
    }, []);

    useEffect(() => {
        setAdminData(data?.admins)
    }, [data]);


    const handleChange = (e) => {
        setCheck(e.target.checked)
    }
    //handle Store Admin
    const handleStoreAdmin = (e) => {
        const data = {
            department_id: parseInt(id),
            admin_id: e.target.value
        }
        dispatch(storeDepartmentAdminAction(data))
    }

    console.log(name, 'name')
    useEffect(() => {
        setCheck(data?.active === "1")
        setName(data?.name)
    }, [data]);


    //data for select
    const AdminData = AdminList?.data?.map((i) => {
        return {value: i.id, text: i.first_name + i.last_name}
    })
    const AccountSchema = Yup.object().shape({
        name: Yup.string().required(t("is_required")),
    })
    const formik = useFormik({
        initialValues: {
            name: name,
        }, validationSchema: AccountSchema, onSubmit: (data) => {
            const totalData = {
                name: data?.name,
                active: check
            }
            dispatch(updateDepartmentAction({id, data: totalData}))
        },
    });
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;
    //handle Delete
    const handleDeleteAdmin = (val) => {
        const data = {
            department_id: parseInt(id),
            admin_id: val
        }
        let newData = _.cloneDeep(adminData);
        const getNewData = _.remove(newData, function (x) {
            return x.id !== val
        })
        setAdminData(getNewData);
        dispatch(removeDepartmentAdminAction(data))
    }

    if (loading) return <LoadingCore loading={loading}/>
    return (<>
        <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mt={2} mb={5}>
            <Button
                variant="contained"
                component={RouterLink}
                to="/dashboard/ticket"
                endIcon={<Iconify icon="ant-design:arrow-left-outlined"/>}
            >
                {t("Back")}
            </Button>
        </Stack>
        <Container maxWidth={"sm"}>
            <FormikProvider value={formik}>
                <Form style={{marginTop: 30}} autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        autoComplete="name"
                        type="name"
                        label={t("name")}
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <Box mt={5}>
                        <SwitchButton checked={check} handleChange={handleChange}/>
                    </Box>
                    <SelectBox sx={{marginTop: 8}} data={AdminData} label={"Admin"}
                               onChange={handleStoreAdmin}
                               fullWidth/>
                    <Box mt={4}>
                        <LoadingButton
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={updateLoad}
                        >
                            {t("Save_Changes")}
                        </LoadingButton>
                    </Box>
                </Form>
            </FormikProvider>
        </Container>

        <TableContainer sx={{minWidth: 800, border: "1px solid #eee", marginTop: 10}}>
            <Table dir={"ltr"}>
                <TableHead>
                    <TableRow sx={{
                        "& th ": {
                            borderBottom: "1px solid #dce0e4",
                        }
                    }}>
                        {TABLE_HEAD.map((cell, index) => (
                            <TableCell align={dir ? "right" : "left"} key={cell.id + index}>
                                {t(cell.label)}
                            </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {adminData?.map((row, i) => {
                        const {
                            first_name,
                            id,
                            active,
                            last_name,
                            email,
                            avatar,
                            mobile,
                            phone,
                            status,
                            type,
                            address
                        } = row;
                        return (<TableRow
                            sx={{
                                "& td ": {
                                    borderBottom: "1px solid #dce0e4",
                                },
                            }}
                            hover
                            key={id + i}
                            tabIndex={-1}
                            role="checkbox"
                        >
                            <TableCell align={dir ? "right" : "left"}>
                                <BadgeAvatar size={"md"} address={avatar}/>
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>{first_name + last_name}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{email}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{phone}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{type}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{mobile}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{status}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>{address}</TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                <Label color={active === "1" ? "success" : "error"}>
                                    {active === "1" ? t("Active") : t("De_Active")}
                                </Label>
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                <Button onClick={() => handleDeleteAdmin(id)}>{t("Delete")}</Button>
                            </TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
};

export default DetailsDepartmentList;
