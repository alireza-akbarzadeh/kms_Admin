import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import {
    Blog,
    Login,
    DashboardApp,
    NotFound,
    Products,
    Register,
    User,
    Setting,
    Ticket,
    WorkSpace,
    FilesComponents,
    Sms,
    Customer, Email
} from "./pages"
import {
    AdminCreate,
    team,
    Drive,
    Profile,
    Notification,
    UserWorkSpace,
    UserReport,
    WorkSpaceList,
    WorkSpaceDetails,
    DetailsDepartemanList,
    ShowTicket
} from "./containers";
import ForgotPass from "./sections/authentication/forgotpassword"
import SetPassword from "./sections/authentication/forgotpassword/SetPassword"
// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {path: 'app', element: <DashboardApp/>},
                {path: 'user', element: <User/>},
                {path: 'products', element: <Products/>},
                {path: 'blog', element: <Blog/>},
                {path: 'work-space', element: <WorkSpace/>},
                {path: 'ticket', element: <Ticket/>},
                {path: 'ticket/:id', element: <ShowTicket/>},
                {path: 'setting', element: <Setting/>},
                {path: 'file', element: <FilesComponents/>},
                {path: 'customer', element: <Customer/>},
                {path: 'sms', element: <Sms/>},
                {path: 'email', element: <Email/>},
                {path: 'admin/create', element: <AdminCreate/>},
                {path: 'team', element: <team/>},
                {path: 'drive', element: <Drive/>},
                {path: 'profile', element: <Profile/>},
                {path: 'setting/Notices', element: <Notification/>},
                {path: 'customer/user-workspace/:id', element: <UserWorkSpace/>},
                {path: 'customer/workspace/:id', element: <WorkSpaceDetails/>},
                {path: 'customer/workspace', element: <WorkSpaceList/>},
                {path: 'customer/user-Report/:id', element: <UserReport/>},
                {path: 'Department/:id', element: <DetailsDepartemanList/>},
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: '/', element: <Navigate to="/dashboard/app"/>},
                {path: 'login', element: <Login/>},
                {path: 'register', element: <Register/>},
                {path: '404', element: <NotFound/>},
                {path: 'forgot-password', element: <ForgotPass/>},
                {path: 'auth/setPassword/:slug', element: <SetPassword/>},
                {path: '*', element: <Navigate to="/404"/>}
            ]
        },
        {path: '*', element: <Navigate to="/404" replace/>}
    ]);
}
