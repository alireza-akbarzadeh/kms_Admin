import PropTypes from 'prop-types';
import {useMemo} from 'react';
// material
import {CssBaseline} from '@mui/material';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {ThemeProvider, createTheme, StyledEngineProvider} from '@mui/material/styles';
//
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, {customShadows} from './shadows';
import {useTranslation} from "react-i18next";

// ----------------------------------------------------------------------

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [],
});

ThemeConfig.propTypes = {
    children: PropTypes.node
};

export default function ThemeConfig({children}) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: {borderRadius: 8},
            typography,
            shadows,
            customShadows
        }),
        []
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);
    const {t} = useTranslation();
    const dir = t('dir') === "rtl";
    return (
        <StyledEngineProvider injectFirst>
            <CacheProvider value={dir ? cacheRtl : cacheLtr}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </StyledEngineProvider>
    );
}
