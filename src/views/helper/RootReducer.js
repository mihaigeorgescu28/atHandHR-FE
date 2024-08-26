// rootReducer.js
import { combineReducers } from "redux";
import blogReducer from "./BlogReducer";
const rootReducer = combineReducers({
  blog: blogReducer
});

export default rootReducer;
