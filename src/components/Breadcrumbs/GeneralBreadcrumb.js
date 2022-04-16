import * as React from 'react';
import {Typography, Box} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import BreadcrumbData from './BreadcrumbDetail'
import {Iconify} from "../index";

function handleClick(event) {
    event.preventDefault();
}

const GeneralBreadcrumb = ({path}) => {
    const {t} = useTranslation();
    const dir = t("direction") === "rtl"
    const getIcon = (name) => <Iconify icon={name} sx={{mr: 1.3}} width={18} height={18}/>;

    return (
        <Box sx={{margin: '0 5px 50px 5px'}} role="presentation" onClick={handleClick}>
            <Breadcrumbs separator={dir ? getIcon("bx:chevron-left") : getIcon("bx:chevron-right")}>
                <Link
                    underline="hover"
                    style={{color: 'text.secondary'}}
                    to='/'
                >
                    <Box sx={{display: 'flex'}}>
                        {getIcon("clarity:home-solid")}
                        <Typography sx={{marginBottom: '2px'}}>
                            {t("Home")}
                        </Typography>
                    </Box>
                </Link>
                <Link
                    underline="hover"
                    style={{color: 'text.secondary'}}
                    to='/dashboard'
                    disabled={true}
                >
                    <Box sx={{display: 'flex'}}>
                        {getIcon("clarity:home-solid")}
                        <Typography sx={{marginBottom: '2px'}}>
                            {t("Dashboard")}
                        </Typography>
                    </Box>
                </Link>
            </Breadcrumbs>
            {/*<BreadcrumbData page={path}/>*/}
        </Box>
    );
};

export default GeneralBreadcrumb