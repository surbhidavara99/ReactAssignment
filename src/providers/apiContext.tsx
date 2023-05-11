import React, { ReactNode, createContext, useContext } from 'react';
import { get } from '../api/getProfile';

interface Props {
  // any props that come into the component
  children?: ReactNode
}

const ApiContext = createContext({});

export const ApiProvider: React.FC<Props> = ({ children }) => {
  const fetchData = async (path: any, page: any) => {
    try {
      const data = await get(path, page); // passing path name and pagination to the fuction
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApiContext.Provider value={{ fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
