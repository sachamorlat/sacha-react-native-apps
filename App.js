import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView, Image, Modal, Button, Alert, ImageBackground} from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const App = () => {
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState(sampleGoals);
  const [selectedGoal, setSelectedGoal] = useState(null); 
  const [isModalVisible, setModalVisible] = useState(false);

  const addGoal = () => {
    if (newGoal.trim() === '') {
      return;
    }

    if (goals.some((goal) => goal.description === newGoal)) {
      Alert.alert('Objectif existant', 'Le nom que vous avez saisis existe déjà dans votre liste, veuillez saisir un autre nom.', [
        {text: 'OK'},
      ]);
      return;
    }

    const newId = (parseInt(goals[goals.length - 1].id) + 1).toString();
    const newGoalItem = { id: newId, description: newGoal };

    setGoals([...goals, newGoalItem]);
    setNewGoal('');
  };

  const deleteGoal = (id) => {
     const updatedGoals = goals.filter((goal) => goal.id !== id);
  setGoals(updatedGoals);
  }

  const openModal = (goal) => {
    setSelectedGoal(goal);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const updateGoal = () => {
    if (newGoal.trim() === '') {
      Alert.alert('Nom incorrect', 'Le nom que vous avez saisis est vide, veuillez saisir un nom correct.', [
        {text: 'OK'},
      ]);
      return;
    }
  
    if (goals.some((goal) => goal.description === newGoal && goal.id !== selectedGoal.id)) {
      Alert.alert('Objectif existant', 'Le nom que vous avez saisis existe déjà dans votre liste, veuillez saisir un autre nom.', [
        {text: 'OK'},
      ]);
      return;
    }
  
    const updatedGoals = goals.map((goal) =>
      goal.id === selectedGoal.id ? { ...goal, description: newGoal } : goal
    );

    setGoals(updatedGoals);
    setNewGoal('');
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
   <TouchableRipple
    onPress={() => openModal(item)}
    style={{ borderRadius: 25, marginVertical: 8 }}
  >
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>{item.description}</Text>
        <TouchableRipple style={styles.deleteButton} onPress={() => deleteGoal(item.id)}>
      <Image source={require('./assets/red-cross.png')} style={{ width: 20, height: 20 }} />
      </TouchableRipple>
    </View>
  </TouchableRipple>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/background-image.jpg')}>
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
            Ajouter
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList data={goals} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center'}}>
            Modification de l'objectif {"\n"}"{selectedGoal?.description}"
          </Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Modifier l'objectif..."
            value={newGoal}
            onChangeText={(text) => setNewGoal(text)}
          />
          <Button title="Modifier" onPress={updateGoal} />
          <Button title="Annuler" onPress={closeModal} />
        </View>
      </Modal>
      <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
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

export default App;