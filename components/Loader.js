import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./styles";

const Loader = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Chargement des données météorologique...</Text>
  </View>
);

export default Loader;
