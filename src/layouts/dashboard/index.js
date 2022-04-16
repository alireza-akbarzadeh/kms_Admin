import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import {Breadcrumbs} from "../../components"
import {useLocation} from "react-router-dom";
import GeneralBreadcrumb from "../../components/Breadcrumbs/GeneralBreadcrumb";
import {profile} from "../../redux/features/users/profileSlice";
import {useDispatch, useSelector} from "react-redux";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex', minHeight: '100%', overflow: 'hidden',
});

const MainStyle = styled('div')(({theme}) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24, paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const {pathname} = useLocation();
    const {data, loading} = useSelector((state) => state.userProfile);


    return (<RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)}/>
            <DashboardSidebar data={data} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>
            <MainStyle>
                <GeneralBreadcrumb path={pathname}/>
                <Outlet/>
            </MainStyle>
        </RootStyle>);
}