import React, { useState } from 'react';
import { AppContext, defaultValue } from './app-context-default';
import { ColorSchemeName } from 'react-native';

const appContext = React.createContext<AppContext>(defaultValue);

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<NonNullable<ColorSchemeName>>(
    defaultValue.colorScheme,
  );

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const contextValue: AppContext = {
    colorScheme,
    toggleColorScheme,
  };
  return <appContext.Provider value={contextValue}>{children}</appContext.Provider>;
};

export default appContext;