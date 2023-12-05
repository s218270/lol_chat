// StateContext.js
'use client'
import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [stateVariable, setStateVariable] = useState(null);
  const [secondaryValue, setSecondaryValue] = useState(null);
  const [loading, setLoading] = useState(null)

  return (
    <StateContext.Provider value={{ stateVariable, setStateVariable, secondaryValue, setSecondaryValue, loading, setLoading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
