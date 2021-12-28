import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import context from '../context/app-context';
import { LoginScreen } from '../screens/LoginScreen';

export default function Navigation() {
  const appContext = React.useContext(context);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={appContext.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const appContext = React.useContext(context);
  const modalTitle = appContext.editMode
    ? 'Редактирование задачи'
    : appContext.addMode
    ? 'Добавление'
    : 'Просмотр задачи';

  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} options={{ title: modalTitle }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const appContext = React.useContext(context);

  if (!appContext.isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: Colors[appContext.colorScheme].tint,
      }}>
      <BottomTab.Screen
        name='TabOne'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Все задачи',
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
          tabBarLabel: '',
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'TabTwo'>) => ({
          title: 'Редактор задач',
          tabBarIcon: ({ color }) => <TabBarIcon name='edit' color={color} />,
          tabBarLabel: '',
          headerRight: () => (
            <Pressable
              onPress={() => {
                appContext.selectCard(null);
                appContext.setAddMode(true);
                appContext.setEditMode(false);
                navigation.navigate('Modal');
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name='plus'
                size={25}
                color={Colors[appContext.colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginTop: 10 }} {...props} />;
}
