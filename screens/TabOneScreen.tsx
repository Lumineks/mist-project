import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import { ToDoCard } from '../components/to-do-card/to-do-card';
import React, { useEffect, useState } from 'react';
import { ToDoCardEntity } from '../components/to-do-card/to-do-card-entity';
import context from '../context/app-context';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const appContext = React.useContext(context);
  const [todos, setTodos] = useState<ToDoCardEntity[]>([]);

  useEffect(() => {
    const url = 'http://192.168.50.223:5001/api/Card/getAll';
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${appContext.token}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        console.log(todos);
        // setTodos(todos);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [appContext.shouldUpdate]);

  const onUpdate = (card: ToDoCardEntity, isDone: boolean) => {
    const url = 'http://192.168.50.223:5001/api/Card/update';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appContext.token}`,
      },
      body: JSON.stringify({
        id: card.id,
        done: isDone,
        title: card.title,
        text: card.text,
      }),
    }).then(() => {
      const url = 'http://192.168.50.223:5001/api/Card/getAll';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${appContext.token}`,
        },
      })
        .then((response) => response.json())
        .then((todos) => setTodos(todos));
    });
  };

  return (
    <ScrollView style={styles.container}>
      {todos.length > 0 ? (
        todos.map((todo) => <ToDoCard card={todo} key={todo.id} onUpdate={onUpdate} />)
      ) : (
        <View>
          <Text>Задач пока нет</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
