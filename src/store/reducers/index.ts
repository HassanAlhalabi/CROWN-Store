import { combineReducers } from "redux";
import { categoriesReducer } from "./categories";
import { userReducer } from "./user";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
})