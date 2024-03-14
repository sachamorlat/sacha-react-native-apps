import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesPage = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", { cocktail: item })}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <Text style={styles.title}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.idDrink}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noFavoritesText}>Aucun favori pour le moment</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesPage;
