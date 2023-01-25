import { createAction } from "../../../utils";
import { USER_ACTIONS } from "./actions"


export const setUser = (user) => createAction(USER_ACTIONS.SET_USER, user); 