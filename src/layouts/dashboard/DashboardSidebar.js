import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
import {Box, Link, Button, Drawer, Typography, Avatar, Stack} from '@mui/material';
// mocks_
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
import {useTranslation} from "react-i18next";
import {BadgeAvatar} from "../../components";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
    }
}));

const AccountStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
    direction: "ltr"
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({isOpenSidebar, onCloseSidebar, data}) {
    const {pathname} = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'},
            }}
        >
            <Box sx={{px: 2.5, py: 3, display: 'inline-flex'}}>
                <Logo/>
            </Box>
            <Box sx={{mb: 5, mx: 2.5}}>
                <Link underline="none" component={RouterLink} to="#">
                    <AccountStyle>
                        <BadgeAvatar address={data?.avatar} size={"md"} badge={true}
                                     badgeColor={data?.status === "free"}/>
                        <Box sx={{ml: 2}}>
                            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                                {data?.first_name + data?.last_name}
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                {data?.type}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>
            <NavSection navConfig={sidebarConfig}/>
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{px: 2.5, pb: 3, mt: 10}}>
                <Stack
                    alignItems="center"
                    spacing={3}
                    sx={{pt: 5, borderRadius: 2, position: 'relative'}}
                >
                    {/*end Sidebar*/}
                </Stack>
            </Box>
        </Scrollbar>
    );
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed',
                            left: dir ? 0 : "unset",
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}

// right: dir ? "0 !important" : "unset",
//     left: dir ? "unset" : 0,