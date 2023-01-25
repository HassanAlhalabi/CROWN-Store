import { CATEGORIES_ACTIONS } from "./actions";

const CATEGORIES_INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_ACTIONS.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}