import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import allReducers from "./reducers";
import config from "./config.json";
import React from "react";

let {env, google_api_key, hotels_api_end_point} = config;

let isProd = env === 'prod';
const Store = createStore(
    allReducers,
    !isProd ? applyMiddleware(logger, require('redux-immutable-state-invariant').default()) : undefined,
    !isProd ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
);

export default Store;
