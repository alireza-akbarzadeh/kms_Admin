import {Link as RouterLink} from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
import {Card, Stack, Link, Container, Typography} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import {LoginForm} from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
import {useTranslation} from "react-i18next";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const Login = () => {
    const {t} = useTranslation();
    return (
        <RootStyle title="Login | Minimal-UI">
            <AuthLayout>
                {t("Dont_Have_Account")} &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                    {t("Get_started")}
                </Link>
            </AuthLayout>
            <SectionStyle sx={{display: {xs: 'none', md: 'flex'}}}>
                <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                    {t("Welcome_Back")}
                </Typography>
                <img src="/static/illustrations/illustration_login.png" alt="login"/>
            </SectionStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{mb: 5}}>
                        <Typography variant="h4" gutterBottom>
                            {t("Sign_in_to_KMS")}
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>{t("Enter_your_details_below")}</Typography>
                    </Stack>
                    <AuthSocial/>
                    <LoginForm/>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            mt: 3,
                            display: {sm: 'none'}
                        }}
                    >
                        {t("Dont_Have_Account")} &nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
                            {t("Get_started")}
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}

export default Login;