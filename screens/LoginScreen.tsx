import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import colors from '../constants/Colors';
import { Checkbox } from 'react-native-paper';
import context from '../context/app-context';

export const LoginScreen = () => {
  const appContext = React.useContext(context);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    if (isEmptyString(username) || isEmptyString(password)) {
      return;
    }

    let url = 'http://192.168.50.223:5001/api/Auth/register';

    if (isRegister) {
      url = 'http://192.168.50.223:5001/api/Auth/login';
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: username, password: password }),
    })
      .then((response) => response.text())
      .then((token) => {
        setIsLoading(false);
        appContext.login(token);
      })
      .catch((error) => console.log(error));
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Регистрация</Text>
            <TextInput
              placeholder='Username'
              style={styles.loginFormTextInput}
              placeholderTextColor='#000'
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              placeholder='Password'
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              placeholderTextColor='#000'
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>Есть аккаунт ?</Text>
              <Checkbox
                status={isRegister ? 'checked' : 'unchecked'}
                onPress={() => setIsRegister(!isRegister)}
              />
            </View>
            {!isLoading ? (
              <View>
                {!isRegister ? (
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => onLoginPress()}
                    title='Создать аккаунт'
                  />
                ) : (
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => onLoginPress()}
                    title='Войти'
                  />
                )}
              </View>
            ) : (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size='large' color='#ffffff' />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.darkGray,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
    color: colors.gray,
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    color: colors.gray,
    fontSize: 16,
    marginRight: 5,
  },
  container: {
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

function isEmptyString(str: string): boolean {
  return str.length === 0;
}
