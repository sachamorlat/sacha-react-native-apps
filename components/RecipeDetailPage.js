import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailPage = ({ route }) => {
  const { cocktail } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        const favoritesArray = favoritesString
          ? JSON.parse(favoritesString)
          : [];
        const isFav = favoritesArray.some(
          (item) => item.idDrink === cocktail.idDrink
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    try {
      let updatedFavorites = [];
      const favoritesString = await AsyncStorage.getItem("favorites");
      if (favoritesString) {
        updatedFavorites = JSON.parse(favoritesString);
      }

      const index = updatedFavorites.findIndex(
        (item) => item.idDrink === cocktail.idDrink
      );
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
        setIsFavorite(false);
      } else {
        updatedFavorites.push(cocktail);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <View>
      <Text>{cocktail.strDrink}</Text>
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={toggleFavorite}>
        {isFavorite ? (
          <Image
            source={require("../assets/isFavorite.png")}
            style={{ width: 30, height: 30 }}
          />
        ) : (
          <Image
            source={require("../assets/isNotFavorite.png")}
            style={{ width: 30, height: 30 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RecipeDetailPage;
