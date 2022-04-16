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

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation();

    const {
        loading,
        errors: AuthError,
        isSuccess,
        data,
    } = useSelector((state) => state.ForgotPass);
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t("Email_must_be_a_valid_email_address"))
            .required(t("Email_is_required")),
    });


    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (data) => {
            const totalData = data.email;
            dispatch(forgotPassUser(totalData))
        },
    });
    useEffect(() => {
        if (isSuccess) {

            Alert.success(data.data)
        }
        if (isSuccess === false) {
            Alert.success(AuthError?.error)
        }
    }, [isSuccess])
    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
        formik;
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
                                autoComplete="username"
                                type="email"
                                label={t("Email_Address")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                {...getFieldProps("email")}
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

export default ForgotPassword;
