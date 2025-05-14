import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

import { setCategories } from "../../store/categories/categories.actions";
import './shop.styles.scss';

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";


const Shop = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getCategories = async () => {
      const categoriesArr = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArr));
    }
    getCategories();
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop;