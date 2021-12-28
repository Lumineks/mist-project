import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import * as React from 'react';
import context from '../context/app-context';
import { useState } from 'react';
import colors from '../constants/Colors';
import layout from '../constants/Layout';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ModalScreen() {
  const navigation = useNavigation();
  const appContext = React.useContext(context);
  const [title, setTitle] = useState(appContext.selectedCard?.title ?? '');
  const [description, setDescription] = useState(appContext.selectedCard?.text ?? '');

  const onSave = async () => {
    if (isEmptyString(title) || isEmptyString(description)) {
      return;
    }

    const url = 'http://192.168.50.223:5001/api/Card/update';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appContext.token}`,
      },
      body: JSON.stringify({
        id: appContext.selectedCard?.id,
        done: appContext.selectedCard?.done,
        title,
        text: description,
      }),
    }).then(() => {
      appContext.selectCard(null);
      appContext.setEditMode(false);
      appContext.setAddMode(false);
      appContext.toggleUpdate();
      navigation.goBack();
    });
  };

  const onAdd = async () => {
    if (isEmptyString(title) || isEmptyString(description)) {
      return;
    }

    const url = 'http://192.168.50.223:5001/api/Card/add';
    const newDate = new Date().toISOString();
    console.log(newDate);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appContext.token}`,
      },
      body: JSON.stringify({
        done: false,
        title,
        text: description,
        timestamp: newDate,
      }),
    }).then(() => {
      appContext.selectCard(null);
      appContext.setEditMode(false);
      appContext.setAddMode(false);
      appContext.toggleUpdate();
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      {appContext.editMode || appContext.addMode ? (
        <>
          <Text style={styles.title}>Заголовок</Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />

          <Text style={styles.title}>Описание</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          {appContext.addMode ? (
            <Button color={colors.gray} onPress={onAdd}>
              Добавить
            </Button>
          ) : (
            <Button color={colors.gray} onPress={onSave}>
              Сохранить
            </Button>
          )}
        </>
      ) : (
        <>
          <Text style={styles.titleLarge}>Задача:</Text>
          <Text style={styles.titleBordered}>{title}</Text>

          <Text style={styles.titleLarge}>Описание:</Text>
          <Text style={styles.titleBordered}>{description}</Text>

          <Text style={styles.titleLarge}>
            Выполнена - {appContext.selectedCard?.done ? 'Да' : 'Нет'}
          </Text>
        </>
      )}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleLarge: {
    padding: 10,
    fontSize: 24,
  },
  titleBordered: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: layout.window.width - 10,
    height: 40,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.gray,
    color: colors.gray,
  },
});

function isEmptyString(str: string): boolean {
  return str.length === 0;
}
