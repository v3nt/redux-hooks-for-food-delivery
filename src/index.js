import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./styles.css";

import { createReduxStore } from "./reducers";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={createReduxStore()}>
    <App />
  </Provider>,
  rootElement
);
