import { createSelector } from 'reselect';

const selectCategoriesReducer = state => state.categories;

export const selectCategoriesArray = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories,
)

export const selectCategories = createSelector(
  [selectCategoriesArray],
  categories => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  },
)
