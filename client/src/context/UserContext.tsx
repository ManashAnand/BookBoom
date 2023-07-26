import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

interface UserContextProps {
  children: ReactNode;
}

const UserContext = createContext<any>(null);
const userAuth = () => useContext(UserContext);

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
};

export { userAuth, UserContextProvider };
