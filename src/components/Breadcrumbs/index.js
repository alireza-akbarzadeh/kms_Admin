import React from "react";
import {Link} from 'react-router-dom';
import {Typography, Box, Breadcrumbs} from '@mui/material';
import BreadcrumbDetail from './BreadcrumbDetail'
import {useTranslation} from "react-i18next";
import {Iconify} from '../../components';

const BreadcrumbsDashboard = ({page}) => {
    const [data, setData] = React.useState();
    const {t} = useTranslation();
    const dir = t("direction") === "rtl";
    const getIcon = (name) => <Iconify icon={name} sx={{mr: 1.3}} width={18} height={18}/>;

    React.useEffect(() => {
        setData(BreadcrumbDetail(page.substr(1)))
    }, [page])
    return (
        <Breadcrumbs separator={dir ? getIcon("bx:chevron-left") : getIcon("bx:chevron-right")}>
            {data?.map((row) => (
                <Link
                    underline="hover"
                    key={row.title}
                    style={row.active ? {color: 'white'} : {
                        color: 'white',
                        pointerEvents: 'none',
                        cursor: 'default',
                        opacity: 0.5
                    }}
                    to={row.link}
                >
                    <Box sx={{display: 'flex'}}>
                        {row.icon}
                        <Typography sx={{marginBottom: '2px'}}>
                            {row.title}
                        </Typography>
                    </Box>
                </Link>
            ))}
        </Breadcrumbs>
    );
};

export default BreadcrumbsDashboard;