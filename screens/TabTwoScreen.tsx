import { ScrollView, StyleSheet, Text } from 'react-native';
import { AdminToDoCard } from '../components/admin-to-do-card/admin-to-do-card';
import React, { useEffect, useState } from 'react';
import { ToDoCardEntity } from '../components/to-do-card/to-do-card-entity';
import context from '../context/app-context';

export default function TabTwoScreen() {
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
        setTodos(todos);
      });
  }, [appContext.shouldUpdate]);

  const onDelete = (id: string) => {
    const url = 'http://192.168.50.223:5001/api/Card/delete';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appContext.token}`,
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
      const url = 'http://192.168.50.223:5001/api/Card/getAll';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${appContext.token}`,
        },
      })
        .then((response) => response.json())
        .then((todos) => {
          setTodos(todos);
          appContext.toggleUpdate();
        });
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container}>
      {todos.length > 0 ? (
        todos.map((todo) => <AdminToDoCard card={todo} onDelete={onDelete} key={todo.id} />)
      ) : (
        <Text>Задач пока нет</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
