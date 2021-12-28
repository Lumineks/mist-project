import React, { useState } from 'react';
import { AppContext, defaultValue } from './app-context-default';
import { ColorSchemeName } from 'react-native';
import { ToDoCardEntity } from '../components/to-do-card/to-do-card-entity';

const appContext = React.createContext<AppContext>(defaultValue);

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<NonNullable<ColorSchemeName>>(
    defaultValue.colorScheme,
  );
  const [selectedCard, setSelectedCard] = useState<ToDoCardEntity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [token, setToken] = useState<string>('');
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const selectCard = (cardToSelect: ToDoCardEntity | null) => {
    setSelectedCard(cardToSelect);
  };

  const login = (token: string) => {
    setToken(token);
  };

  const toggleShouldUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  const isLoggedIn = !!token;

  const contextValue: AppContext = {
    colorScheme,
    toggleColorScheme,
    selectedCard,
    selectCard,
    editMode,
    setEditMode,
    addMode,
    setAddMode,
    login,
    token,
    isLoggedIn,
    toggleUpdate: toggleShouldUpdate,
    shouldUpdate,
  };
  return <appContext.Provider value={contextValue}>{children}</appContext.Provider>;
};

export default appContext;
