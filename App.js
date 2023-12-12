import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';

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

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Liste d'Objectif</Text>
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
  }
});

const sampleGoals = [
  { id: '1', title: 'Objectif 1', description: 'Faire les courses' },
  { id: '2', title: 'Objectif 2', description: 'Aller à la salle de sport 3 fois par semaine' },
  { id: '3', title: 'Objectif 3', description: 'Monter à plus de 5000m d altitude' },
  { id: '4', title: 'Objectif 4', description: 'Acheter mon premier appartement' },
  { id: '5', title: 'Objectif 5', description: 'Perdre 5 kgs' },
  { id: '6', title: 'Objectif 6', description: 'Gagner en productivité' },
  { id: '7', title: 'Objectif 7', description: 'Apprendre un nouveau langage' },
  { id: '8', title: 'Objectif 8', description: 'Faire une mission en freelance' },
  { id: '9', title: 'Objectif 9', description: 'Organiser un meetup autour de la tech' },
  { id: '10', title: 'Objectif 10', description: 'Faire un triathlon' },
];

