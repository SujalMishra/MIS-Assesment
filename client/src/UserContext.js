import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(storedUser);

  const loginUser = (token, userId, email) => {
    const newUser = { token, userId, email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};