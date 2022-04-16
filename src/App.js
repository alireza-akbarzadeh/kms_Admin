// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import {BaseOptionChartStyle} from './components/charts/BaseOptionChart';
import {useTranslation} from "react-i18next";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ----------------------------------------------------------------------

export default function App() {
    const {t} = useTranslation();
    const dir = t("dir") === "rtl" ? "rtl" : "ltr";
    return (
        <div dir={dir}>
            <ThemeConfig>
                <ScrollToTop/>
                <GlobalStyles/>
                <BaseOptionChartStyle/>
                <ToastContainer/>
                <Router/>
            </ThemeConfig>
        </div>
    );
}
