import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailPage = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktail, setCocktail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const LoaderAnimation = require("../assets/lottie/cocktail.json");

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
        );
        const responseData = await response.json();
        console.log(responseData)
        const cocktailData = responseData.drinks && responseData.drinks[0];
        console.log(cocktailData)
        setCocktail(cocktailData);
        setLoading(false); // Change loading state to false when data is fetched
      } catch (error) {
        console.error("Error fetching cocktail details:", error);
      }
    };

    fetchCocktailDetails();
  }, [cocktailId]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        const favoritesArray = favoritesString
          ? JSON.parse(favoritesString)
          : [];

        if (cocktail && cocktail.idDrink) {
          const isFav = favoritesArray.some(
            (item) => item.idDrink === cocktail.idDrink
          );
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();
  }, [cocktail]);

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

  if (!cocktail || loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={LoaderAnimation}
          autoPlay
          loop
          style={styles.loaderAnimation}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.description}>
        Description: {cocktail.strInstructions}
      </Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <Image
          source={
            isFavorite
              ? require("../assets/isFavorite.png")
              : require("../assets/isNotFavorite.png")
          }
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderAnimation: {
    width: 200,
    height: 200,
  },
});

export default RecipeDetailPage;
