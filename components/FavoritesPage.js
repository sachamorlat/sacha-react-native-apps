import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
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
      // Rafraîchir les favoris lorsque la page est mise au premier plan
      fetchFavorites();
    });

    // Nettoyer l'écouteur lorsque le composant est démonté
    return unsubscribe;
  }, [navigation]);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", { cocktail: item })}
    >
      <View style={{ margin: 10 }}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
        <Text>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.idDrink}
        />
      ) : (
        <Text>Aucun favori pour le moment</Text>
      )}
    </View>
  );
};

export default FavoritesPage;
