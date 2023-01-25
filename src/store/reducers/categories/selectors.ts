import { createSelector } from "reselect";

const selectorRef = state => state;

const categoriesSelect = createSelector(selectorRef,state => state.categories);

export const selectCategoriesMap = createSelector(categoriesSelect ,state => {
    return state.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
})