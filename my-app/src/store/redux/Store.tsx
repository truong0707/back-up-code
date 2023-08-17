import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReduder, userRegisterReducer } from "./reducers/userReducer";
import {
  listDataUserReducer,
} from "./reducers/dataUserReducer";

const reducer = combineReducers({
  userLogin: userLoginReduder,
  userRegister: userRegisterReducer,
  dataUsers: listDataUserReducer,
});

const middleware = [thunk];

// check Local LocalStorage --> initState
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "{}")
  : null;

export interface StateStore {
  dataUsers: {
    listDataUsers: [],
    error: Boolean,
    loading: Boolean,
    msgUpdateSuccess: string,
    msgUpdateError: string,
    msgAddSuccess: string,
    msgDeleteSuccess: string
    msgDeleteError: string,
    dataUserDetail: []
  }
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
