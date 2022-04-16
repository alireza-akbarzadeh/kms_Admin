// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22}/>;

const sidebarConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon('eva:pie-chart-2-fill'),
        isMulti: [
            {title: "Create_Admin", path: "admin/create", icon: getIcon('subway:admin-1')},
        ]
    },
    {
        title: 'profile',
        path: '/dashboard/profile',
        icon: getIcon('iconoir:profile-circled'),
        isMulti: []
    },

    // {
    //     title: 'blog',
    //     path: '/dashboard/blog',
    //     icon: getIcon('eva:file-text-fill'),
    //     isMulti: []
    //
    // },

    {
        title: 'ticket',
        path: '/dashboard/ticket',
        icon: getIcon('ri:customer-service-2-line'),
        isMulti: []

    },
    {
        title: 'file',
        path: '/dashboard/file',
        icon: getIcon('simple-icons:files'),
        isMulti: []
    },
    {
        title: 'customer',
        path: '/dashboard/customer',
        icon: getIcon('raphael:customer'),
        isMulti: [
            {title: "Customer_List", path: "/dashboard/customer/workspace", icon: getIcon('ph:user-list-fill')},
            // {title: "User_Report", path: "/dashboard/customer/user-Report", icon: getIcon('icon-park-outline:sales-report')},
            // {title: "Team", path: "team", icon: getIcon('eva:pie-chart-2-fill')},
            // {title: "User", path: "User", icon: getIcon('eva:pie-chart-2-fill')},
            // {title: "Drive", path: "drive", icon: getIcon('eva:pie-chart-2-fill')},
        ]
    },
    {
        title: 'Setting',
        path: '/dashboard/setting',
        icon: getIcon('uiw:setting'),
        isMulti: [
            {title: "Systematic_Notification", path: "setting/Notices", icon: getIcon('entypo:info')},
            {
                title: 'Config_Panel_sms',
                path: '/dashboard/sms',
                icon: getIcon('subway:sms-3'),
            },
            {
                title: 'Config_email',
                path: '/dashboard/email',
                icon: getIcon('ic:round-attach-email'),
            },
            {
                title: 'workSpace',
                path: '/dashboard/work-space',
                icon: getIcon('ic:round-work'),
            },
        ]
    },
];

export default sidebarConfig;
