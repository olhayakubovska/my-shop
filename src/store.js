import { applyMiddleware, combineReducers, createStore } from "redux";

import { thunk } from "redux-thunk";
import {
  AppReducer,
  productsReducer,
  UserReducer,
  UserSReducer,
} from "./reducers";

// const composeEnhangers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_

const reducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  users: UserSReducer,
  products: productsReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
