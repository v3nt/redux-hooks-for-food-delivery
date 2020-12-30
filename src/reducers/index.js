import { combineReducers } from "redux";

import foodReducer from "./foodReducer";

export default combineReducers({
  food: foodReducer,
});
