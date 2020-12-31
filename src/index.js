import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import { createReduxStore } from "./redux";

import "./styles.css";

import reducers from "./reducers";

console.dir(reducers);
// const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

// const initialState = {
//   diet: "all",
//   menuById: {},
//   menuIdList: {
//     all: [],
//     veg: [],
//   },
//   cartByIds: {},
// };

// const createReduxStore = () => {
//   return createStore(reducers, enableReduxDevTools);
// };

// const configureStore = (initialState = {}) => {
//   return createStore(reducers, initialState, enableReduxDevTools);
// };
// const store = configureStore(initialState);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createReduxStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
