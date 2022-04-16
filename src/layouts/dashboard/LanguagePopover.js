import {useRef, useState} from 'react';
// material
import {alpha} from '@mui/material/styles';
import {Box, MenuItem, ListItemIcon, ListItemText, IconButton} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import {useTranslation} from "react-i18next";
import i18n from "../../localization/i18";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function LanguagePopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {t} = useTranslation();

    const LANGS = [
        {
            value: 'en',
            label: t('English'),
            icon: '/static/icons/ic_flag_en.svg'
        },
        {
            value: 'fa',
            label: t('Persian'),
            icon: '/static/icons/ic_flag-fa.png'
        }
    ];
    const handleChangeLng = (value) => {
        setOpen(false);
        i18n.changeLanguage(value);
    }
    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 34,
                    height: 34,
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
                    })
                }}
            >
                <img src={"/static/icons/icons8-language-64.png"} alt={"lang"}/>
            </IconButton>
            <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
                <Box sx={{py: 1}}>
                    {LANGS.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === LANGS[0].value}
                            onClick={() => handleChangeLng(option.value)}
                            sx={{py: 1, px: 2.5}}
                        >
                            <ListItemIcon sx={option.value === "fa" ? {width: 33, height: 33} : {}}>
                                <Box component="img" alt={option.label} src={option.icon}/>
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                {option.label}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </Box>
            </MenuPopover>
        </>
    );
}