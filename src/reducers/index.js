import { combineReducers } from "redux";
import { createStore } from "redux";

import foodReducer from "./foodReducer";

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(foodReducer, enableReduxDevTools);
  return store;
}

export default combineReducers({
  foodReducer,
});
