import {useEffect, useRef, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// material
import {alpha} from '@mui/material/styles';
import {
    Button,
    Box,
    Divider,
    MenuItem,
    Typography,
    Avatar,
    IconButton,
    Stack,
    Badge,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import {BadgeAvatar, SwitchButton} from "../../components";
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import {logOut} from "../../redux/features/Auth/logOutSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {restUserNameAction} from "../../redux/features/users/UpdateProfile";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home', icon: 'eva:home-fill', linkTo: '/'
    },
    {
        label: 'Profile', icon: 'eva:person-fill', linkTo: '/dashboard/profile'
    }, {
        label: 'Settings', icon: 'eva:settings-2-fill', linkTo: '/dashboard/setting'
    },
    {
        label: 'status', icon: 'simple-icons:statuspal', linkTo: '/'
    },
];
// ----------------------------------------------------------------------


export default function AccountPopover() {
    const [checked, setChecked] = useState(null);
    const anchorRef = useRef(null);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {data, loading} = useSelector((state) => state.userProfile);

    useEffect(() => {
        setChecked(data.status === "free")
    }, []);


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        dispatch(logOut())
    }
    const handleStatus = (e) => {
        setChecked(e.target.checked)
        const data = {
            status: checked ? "free" : "offline"
        }
        dispatch(restUserNameAction(data))
    }

    if (loading) {
        return "....."
    }
    return (<>
        <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
                padding: 0, width: 44, height: 44, ...(open && {
                    '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                    }
                })
            }}
        >
            <BadgeAvatar badge={true} badgeColor={data?.status === "free"} address={data?.avatar} size={"sm"}/>
        </IconButton>
        <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{width: 220, direction: "ltr"}}
        >
            <Stack direction={"column"} gap={1} sx={{my: 1.9, px: 2.5}}>
                <Typography variant="subtitle1" noWrap>
                    {data?.first_name + data?.last_name}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                    {data?.email}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                    {data?.type}
                </Typography>
            </Stack>
            <Divider sx={{my: 1}}/>
            {MENU_OPTIONS.map((option) => (<MenuItem
                key={option.label}
                to={option.linkTo}
                component={option.label === "status" ? Box : RouterLink}
                onClick={option.label === "status" ? "" : handleClose}
                sx={{typography: 'body2', py: 1, px: 2.5}}
            >
                <Iconify
                    icon={option.icon}
                    sx={{
                        mr: 2, width: 24, height: 24
                    }}
                />
                {option.label === "status" ? (
                    <SwitchButton checked={checked} handleChange={handleStatus} sx={{m: 1}}/>
                ) : (
                    <>
                        {t(option.label)}
                    </>
                )}
            </MenuItem>))}
            <Box sx={{p: 2, pt: 1.5}}>
                <Button onClick={() => handleLogout()} fullWidth color="inherit" variant="outlined">
                    {t("Logout")}
                </Button>
            </Box>
        </MenuPopover>
    </>);
}
