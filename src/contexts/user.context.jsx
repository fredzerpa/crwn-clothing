import { createContext, useEffect, useState } from "react";
import { createUserDoc, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async user => {
      if (user) await createUserDoc(user);
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])
  
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}