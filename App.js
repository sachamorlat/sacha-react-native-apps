import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native';

export default function App() {
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState(sampleGoals);

  const addGoal = () => {
    if (newGoal.trim() === '') {
      return;
    }

    const newId = (parseInt(goals[goals.length - 1].id) + 1).toString();
    const newGoalItem = { id: newId, title: `Objectif ${newId}`, description: newGoal };

    setGoals([...goals, newGoalItem]);
    setNewGoal('');
  };

  const deleteGoal = (id) => {
     const updatedGoals = goals.filter((goal) => goal.id !== id);
  setGoals(updatedGoals);
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteGoal(item.id)}>
        <Image source={require('./assets/red-cross.png')} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Liste d'Objectif</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nouvel objectif..."
          value={newGoal}
          onChangeText={(text) => setNewGoal(text)}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText} onPress={addGoal}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList data={goals} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#08F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  }
});

const sampleGoals = [
  { id: '1', description: 'Faire les courses' },
  { id: '2', description: 'Aller à la salle de sport 3 fois par semaine' },
  { id: '3', description: 'Monter à plus de 5000m d altitude' },
  { id: '4', description: 'Acheter mon premier appartement' },
  { id: '5', description: 'Perdre 5 kgs' },
  { id: '6', description: 'Gagner en productivité' },
  { id: '7', description: 'Apprendre un nouveau langage' },
  { id: '8', description: 'Faire une mission en freelance' },
  { id: '9', description: 'Organiser un meetup autour de la tech' },
  { id: '10', description: 'Faire un triathlon' },
];

