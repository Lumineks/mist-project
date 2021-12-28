import { ColorSchemeName } from 'react-native';
import { ToDoCardEntity } from '../components/to-do-card/to-do-card-entity';

export interface AppContext {
  colorScheme: NonNullable<ColorSchemeName>;
  toggleColorScheme: () => void;
  selectedCard: ToDoCardEntity | null;
  selectCard: (cardToSelect: ToDoCardEntity | null) => void;
  editMode: boolean;
  setEditMode: (isEditMode: boolean) => void;
  addMode: boolean;
  setAddMode: (isAddMode: boolean) => void;
  isLoggedIn: boolean;
  login: (token: string) => void;
  token: string;
  shouldUpdate: boolean;
  toggleUpdate: () => void;
}

export const defaultValue: AppContext = {
  colorScheme: 'dark',
  toggleColorScheme: () => {},
  selectedCard: null,
  selectCard: () => {},
  editMode: true,
  setEditMode: () => {},
  addMode: true,
  setAddMode: () => {},
  isLoggedIn: false,
  login: () => {},
  token: '',
  shouldUpdate: false,
  toggleUpdate: () => {},
};
