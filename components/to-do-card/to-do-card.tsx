import { Avatar, Button, Card, Checkbox } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ToDoCardEntity } from './to-do-card-entity';
import * as React from 'react';
import context from '../../context/app-context';

export type Props = {
  card: ToDoCardEntity;
  onUpdate: (card: ToDoCardEntity, isDone: boolean) => void;
};

const LeftContent = (props: {}) => <Avatar.Icon {...props} icon='folder' />;

export const ToDoCard = ({ card, onUpdate }: Props) => {
  const appContext = React.useContext(context);
  const [isDone, setIsDone] = useState(card.done);
  const navigation = useNavigation();

  const onPress = () => {
    appContext.selectCard({ ...card, done: isDone });
    appContext.setEditMode(false);
    navigation.navigate('Modal');
  };

  useEffect(() => {
    onUpdate(card, isDone);
  }, [isDone]);

  const date = new Date(card.Timestamp);
  console.log(date);
  return (
    <Card style={styles.card}>
      <Card.Title title={card.title} left={LeftContent} titleStyle={styles.text} />
      <Card.Actions style={styles.actions}>
        <Button color={colors.gray} onPress={onPress}>
          Подробнее...
        </Button>
        <View>
          {/*<Text>{date}</Text>*/}
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>{isDone ? 'Выполнено' : 'Надо сделать'}</Text>
          <Checkbox status={isDone ? 'checked' : 'unchecked'} onPress={() => setIsDone(!isDone)} />
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.darkGray,
    marginVertical: 5,
    borderColor: '#f9fafb',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    color: colors.gray,
  },
  actions: {
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: colors.gray,
    fontSize: 16,
    marginRight: 5,
  },
});
