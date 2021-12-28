import { Avatar, Button, Card, Checkbox } from 'react-native-paper';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import context from '../../context/app-context';
import { ToDoCardEntity } from '../to-do-card/to-do-card-entity';
import layout from '../../constants/Layout';

export type Props = {
  card: ToDoCardEntity;
  onDelete: (id: string) => void;
};

export const AdminToDoCard = ({ card, onDelete }: Props) => {
  const appContext = React.useContext(context);
  const navigation = useNavigation();

  const onPressEdit = () => {
    appContext.selectCard(card);
    appContext.setEditMode(true);
    navigation.navigate('Modal');
  };

  return (
    <Card style={styles.card}>
      <View>
        <Card.Title title={card.title} titleStyle={styles.text} />
      </View>
      <Card.Actions style={styles.actions}>
        <Button icon='pencil-outline' color='#ffffff' onPress={onPressEdit}>
          Редактировать
        </Button>
        <Button icon='delete' color='#fb7185' onPress={() => onDelete(card.id)}>
          Удалить
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: layout.window.width / 2 - 14,
    backgroundColor: colors.darkGray,
    marginVertical: 5,
    marginHorizontal: 7,
    borderColor: '#f9fafb',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    color: colors.gray,
    width: '100%',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
