import * as Yup from "yup";
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
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
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Auth} from "../../../redux/features/Auth/logInSlice";
import {Alert} from "../../../helper";
// ----------------------------------------------------------------------

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation();

    const {
        loading,
        errors: AuthError,
        isSuccess,
    } = useSelector((state) => state.Login);
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t("Email_must_be_a_valid_email_address"))
            .required(t("Email_is_required")),
        password: Yup.string().required(t("Password_is_required")),
    });
    console.log(AuthError, "AuthError AuthError AuthError")

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: (data) => {
            const totalData = {
                email: data.email,
                password: data.password,
            };
            dispatch(Auth(totalData))
        },
    });
    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard/profile', {replace: true});
        }
        if (isSuccess === false) {
            Alert.ERROR(`${t('Error_Login')}`)
        }
    }, [isSuccess, AuthError])

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
        formik;
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const token = cookie.get("token")
    useEffect(() => {
        if (token) navigate('/dashboard/app', {replace: true});

    }, [token])
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label={t("Email_Address")}
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label={t("Password")}
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Iconify
                                            icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 2}}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...getFieldProps("remember")}
                                checked={values.remember}
                            />
                        }
                        label={t("Remember_me")}
                    />

                    <Link
                        component={RouterLink}
                        variant="subtitle2"
                        to="/forgot-password"
                        underline="hover"
                    >
                        {t("Forgot_password")}
                    </Link>
                </Stack>
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={loading}
                >
                    {t("Login")}
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
