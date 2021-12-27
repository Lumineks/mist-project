import { ColorSchemeName } from 'react-native';

export interface AppContext {
  colorScheme: NonNullable<ColorSchemeName>;
  toggleColorScheme: () => void;
}

export const defaultValue: AppContext = { colorScheme: 'dark', toggleColorScheme: () => {} };
