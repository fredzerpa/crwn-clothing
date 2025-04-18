import { createContext, useEffect, useState } from "react";

import { addCollectionAndDocs, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../data/shop.data";

export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
    }
    getCategoriesMap();
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}