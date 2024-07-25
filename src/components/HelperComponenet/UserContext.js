"use client"
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');


  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken,username, setUsername}}>
      {children}
    </UserContext.Provider>
  );
};
