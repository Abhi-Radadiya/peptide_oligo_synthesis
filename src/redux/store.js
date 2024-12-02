import { applyMiddleware, createStore } from "redux";
import sequenceReducer from "./reducers";
import { thunk } from "redux-thunk";

const store = createStore(sequenceReducer, applyMiddleware(thunk));

export default store;
