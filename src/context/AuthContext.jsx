import React, { createContext, useEffect, useState } from 'react'
import { userChange } from '../auth/firebase'


export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(false)
//   const [currentUser, setCurrentUser] = useState({
//     displayName: "Sercan YILMAZ",
//   });

// userChange(setCurrentUser);



useEffect(() => {
 userChange(setCurrentUser);
 
}, [])

console.log(currentUser);


  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;