import {useState} from "react";
import PropTypes from "prop-types";
import {
    NavLink as RouterLink,
    matchPath,
    useLocation, useNavigate,
} from "react-router-dom";
// material
import {alpha, useTheme, styled} from "@mui/material/styles";
import {
    Box,
    List,
    Collapse,
    ListItemText,
    ListItemIcon,
    ListItemButton, Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
//
import Iconify from "./Iconify";
import {useTranslation} from "react-i18next";
import AccordionNav from "../layouts/dashboard/AccoirdionNav";
// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func,
};

function NavItem({item, active}) {
    const theme = useTheme();
    const isActiveRoot = active(item.path);
    const {title, isMulti, path, icon, info, children} = item;
    const [open, setOpen] = useState(isActiveRoot);
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const activeRootStyle = {
        color: "primary.main",
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
        ),
        "&:before": {display: "block"},
    };

    const activeSubStyle = {
        color: "text.primary",
        fontWeight: "fontWeightMedium",
    };
    const {t} = useTranslation();
    const dir = t("dir") === "rtl";
    const ListItemStyle = styled((props) => (
        <ListItemButton disableGutters {...props} />
    ))(({theme}) => ({
        ...theme.typography.body2,
        height: 48,
        position: "relative",
        textTransform: "capitalize",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(2.5),
        color: theme.palette.text.secondary,
        "&:before": {
            top: 0,
            right: 0,
            width: 5,
            bottom: 0,
            content: "''",
            display: "none",
            position: "absolute",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            backgroundColor: theme.palette.primary.main,
        },
    }));

    const SubList = styled(ListItemStyle)({
        padding: 0,
    });

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle),
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title}/>
                    {info && info}
                    <Iconify
                        icon={
                            open
                                ? "eva:arrow-ios-downward-fill"
                                : "eva:arrow-ios-forward-fill"
                        }
                        sx={{width: 16, height: 16, ml: 1}}
                    />
                </ListItemStyle>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children?.map((item, i) => {
                            const {title, path} = item;
                            const isActiveSub = active(path);
                            return (
                                <ListItemStyle
                                    key={title + path + i}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle),
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: "flex",
                                                borderRadius: "50%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "text.disabled",
                                                transition: (theme) =>
                                                    theme.transitions.create("transform"),
                                                ...(isActiveSub && {
                                                    transform: "scale(2)",
                                                    bgcolor: "primary.main",
                                                }),
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={title}/>
                                </ListItemStyle>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }
    const getIcon = (name) => <Iconify icon={name} width={22} height={22}/>;
    return (
        <>
            {item.isMulti.length === 0 ? (
                <ListItemStyle
                    component={RouterLink}
                    to={path}
                    sx={{
                        ...(isActiveRoot && activeRootStyle),
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title}/>
                    {info && info}
                </ListItemStyle>
            ) : (
                <Accordion
                    sx={(theme) => ({
                        ...theme.typography.body2,
                        position: "relative",
                        textTransform: "capitalize",
                        paddingLeft: theme.spacing(2.7),
                        paddingRight: theme.spacing(0.1),
                        color: theme.palette.text.secondary,
                        backgroundColor: "#f9fafb",
                        "&:before": {
                            height: 0,
                        },
                    })}>
                    <AccordionSummary
                        expandIcon={getIcon('eva:arrow-ios-downward-outline')}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                        <ListItemText disableTypography primary={item.title}/>
                        {info && info}
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.isMulti.map((multi, index) => (
                            <>
                                <SubList
                                    key={multi.path + index}
                                    component={RouterLink}
                                    to={multi.path}
                                >
                                    <ListItemIconStyle>{multi.icon}</ListItemIconStyle>
                                    <ListItemText disableTypography primary={t(multi.title)}/>
                                    {info && info}
                                </SubList>
                            </>
                        ))}
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
}

NavSection.propTypes = {
    navConfig: PropTypes.array,
};

export default function NavSection({navConfig, ...other}) {
    const {pathname} = useLocation();
    const match = (path) =>
        path ? !!matchPath({path, end: false}, pathname) : false;
    const {t} = useTranslation();
    return (
        <Box sx={{direction: "ltr"}} {...other}>
            <List disablePadding>
                {navConfig.map((item, i) =>
                    <NavItem
                        key={item.title + i}
                        item={{...item, title: t(item.title)}}
                        active={match}
                    />
                )}
            </List>
        </Box>
    );
}
