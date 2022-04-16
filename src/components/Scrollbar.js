import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
// material
import {alpha, styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {useTranslation} from "react-i18next";

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
});


// ----------------------------------------------------------------------

Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default function Scrollbar({children, sx, ...other}) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    const {t} = useTranslation();
    const dir = t("dir") === "rtl" ? "rtl" : "ltr";

    const SimpleBarStyle = styled(SimpleBarReact)(({theme}) => ({
        direction: dir,
        maxHeight: '100%',
        '& .simplebar-scrollbar': {
            '&:before': {
                backgroundColor: alpha(theme.palette.grey[600], 0.48)
            },
            '&.simplebar-visible:before': {
                opacity: 1
            }
        },
        '& .simplebar-track.simplebar-vertical': {
            width: 10
        },
        '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
            height: 6
        },
        '& .simplebar-mask': {
            zIndex: 'inherit'
        }
    }));
    if (isMobile) {
        return (
            <Box sx={{overflowX: 'auto', ...sx}} {...other}>
                {children}
            </Box>
        );
    }
    return (
        <RootStyle dir={"rtl"}>
            <SimpleBarStyle timeout={500} direction={"rtl"} clickOnTrack={false} sx={sx} {...other}>
                {children}
            </SimpleBarStyle>
        </RootStyle>
    );
}
