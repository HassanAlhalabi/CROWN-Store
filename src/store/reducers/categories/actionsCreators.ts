import { ICategory } from '../../../models/category';
import { createAction } from '../../../utils/index';
import { CATEGORIES_ACTIONS } from './actions';

export const setCategories = (categories: ICategory[]) => createAction(CATEGORIES_ACTIONS.SET_CATEGORIES, categories);