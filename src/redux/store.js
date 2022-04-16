import {configureStore} from "@reduxjs/toolkit";

//*****  Persist *****//


//*****  Reducers *****//

import persistReducer from "./combineReducers"

//*****  MIDDLEWRES *****//

let middlewares = [];

if (process.env.NODE_ENV === "development") {
    const {createLogger} = require(`redux-logger`);
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    });

    middlewares.push(logger);
}

//*****  CONFIGURESTORE  *****//

export const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === "development",
});

// export const persistor = persistStore(store);

