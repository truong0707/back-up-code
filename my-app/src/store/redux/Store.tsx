import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReduder, userRegisterReducer } from "./reducers/userReducer";
import {
  addDataUserReducer,
  listDataUserReducer,
} from "./reducers/dataUserReducer";

const reducer = combineReducers({
  userLogin: userLoginReduder,
  userRegister: userRegisterReducer,
  dataUsers: listDataUserReducer,
  addDataUser: addDataUserReducer,
});

const middleware = [thunk];

// check Local LocalStorage --> initState
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "{}")
  : null;

export interface StateStore {
  dataUsers: any;
  deleteDataUser: any;
  addDataUser: any;
  updateDataUser: any;
  userLogin: {
    loading: boolean;
    userInfo: {
      name?: string;
      email?: string;
    };
    error: boolean;
  };
}

const initalState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

// create store
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
