import * as Yup from "yup";
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {useFormik, Form, FormikProvider} from "formik";
import cookie from "js-cookie";
// material
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Container,
    Typography,
    styled
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {forgotPassUser} from "../../../redux/features/Auth/forgotpassSlice";
import {setPassUser} from "../../../redux/features/Auth/setPasswordSlice";
import {prev} from "stylis";
import {Alert} from "../../../helper";
// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const SetPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({showPass: false, showRePass: false});
    const {t} = useTranslation();

    const {
        loading,
        errors: AuthError,
        isSuccess,
        data,
    } = useSelector((state) => state.SetPss);
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        password: Yup.string().required(t("Password_is_required")),
        re_password: Yup.string().required(t("Password_is_required")),
    });

    const {slug} = useParams();
    const formik = useFormik({
        initialValues: {
            password: "",
            re_password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (data) => {
            const totalData = {
                password: data.password,
                re_password: data.re_password,
            }
            dispatch(setPassUser({slug: slug, data: totalData}))
        },
    });


    useEffect(() => {
        if (isSuccess) {
            Alert.success(data?.data)
            navigate('/dashboard/app', {replace: true});
        }
        if (isSuccess === false) {
            Alert.error(AuthError?.error)
        }
    }, [isSuccess])
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
        formik;

    const handleShowPassword = () => {
        setShowPassword(state => ({...state, showPass: !state.showPass}))
    }
    const handleShowRePassword = () => {
        setShowPassword(state => ({...state, showRePass: !state.showRePass}))
    }
    return (
        <Container maxWidth="sm">
            <ContentStyle>
                <Typography mb={5} variant="h4" gutterBottom>
                    {t("Forgot_Password")}
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword.showPass ? "text" : "password"}
                                label={t("Password")}
                                {...getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword} edge="end">
                                                <Iconify
                                                    icon={showPassword.showPass ? "eva:eye-fill" : "eva:eye-off-fill"}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword.showRePass ? "text" : "password"}
                                label={t("Re_Password")}
                                {...getFieldProps("re_password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowRePassword} edge="end">
                                                <Iconify
                                                    icon={showPassword.showRePass ? "eva:eye-fill" : "eva:eye-off-fill"}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.re_password && errors.re_password)}
                                helperText={touched.re_password && errors.re_password}
                            />
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={loading}
                            >
                                {t("Login")}
                            </LoadingButton>
                        </Stack>
                    </Form>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{my: 2}}
                    >
                        <Typography/>
                        <Link
                            component={RouterLink}
                            variant="subtitle2"
                            to="/login"
                            underline="hover"
                        >
                            {t("Back_To_Login")}
                        </Link>
                    </Stack>
                </FormikProvider>
            </ContentStyle>
        </Container>
    );
};

export default SetPassword;
