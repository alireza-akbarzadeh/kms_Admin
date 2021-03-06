// scroll barerror
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

//
import App from './App';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import { store } from "./redux/store";
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import "@sweetalert2/theme-material-ui";
import "./assets/css/index.css"
// ----------------------------------------------------------------------
let persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistor}
        >
            <HelmetProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </HelmetProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
