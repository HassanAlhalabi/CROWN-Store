import { USER_ACTIONS } from "./actions";

const USER_INITIAL_STATE = {
    user: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: any) => {
    switch (action.type) {
        case USER_ACTIONS.SET_USER:
            return {...state, user: action.payload}
        default:
            return state;
    }
}