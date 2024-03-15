import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const styles = StyleSheet.create({
  cocktailItem: {
    margin: 10,
    alignItems: "center",
  },
  cocktailImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  cocktailName: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
});

const HomePage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCocktails().then((data) => {
      setCocktails(data);
    });
    loadFavorites();
  }, []);

  const fetchCocktails = async () => {
    try {
      const alcoholicResponse = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
      );
      const nonAlcoholicResponse = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );

      const alcoholicData = await alcoholicResponse.json();
      const nonAlcoholicData = await nonAlcoholicResponse.json();

      const combinedCocktails = [
        ...alcoholicData.drinks,
        ...nonAlcoholicData.drinks,
      ];

      return combinedCocktails;
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      return [];
    }
  };

  const fetchCocktailDetails = async (item) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`
      );
      if (response.status !== 200) {
        console.error(response);
        throw new Error("La réponse n'est pas OK");
      }
      const cocktailDetails = response.data; // Pas besoin de .json() avec axios
      if (!cocktailDetails.drinks || cocktailDetails.drinks.length === 0) {
        throw new Error("Aucun détail de cocktail trouvé");
      }
      // Accédez au premier élément du tableau de boissons
      navigation.navigate("RecipeDetail", {
        cocktailDetails: cocktailDetails.drinks[0],
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du cocktail :",
        error
      );
    }
  };

  const renderCocktailItem = ({ item }) => (
    <TouchableOpacity onPress={() => fetchCocktailDetails(item)}>
      <View style={styles.cocktailItem}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.cocktailImage}
        />
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Image
            source={
              favorites.some((cocktail) => cocktail.idDrink === item.idDrink)
                ? require("../assets/isFavorite.png")
                : require("../assets/isNotFavorite.png")
            }
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  const toggleFavorite = async (item) => {
    try {
      let updatedFavorites = [...favorites];
      const index = updatedFavorites.findIndex(
        (cocktail) => cocktail.idDrink === item.idDrink
      );
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      } else {
        updatedFavorites.push(item);
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={cocktails}
        renderItem={renderCocktailItem}
        keyExtractor={(item) => item.idDrink}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#0000ff" />
        }
      />
    </View>
  );
};

export default HomePage;
