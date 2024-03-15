import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
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
});

function CategoryDetailPage({ route }) {
  const { category } = route.params;
  const [cocktails, setCocktails] = useState([]);
  const navigation = useNavigation(); // Obtenir l'objet de navigation

  useEffect(() => {
    fetchCocktailsByCategory(category).then((data) => {
      setCocktails(data);
    });
  }, [category]);

  const fetchCocktailsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response.status !== 200) {
        console.error(response);
        throw new Error("La réponse n'est pas OK");
      }
      const cocktailsByCategory = response.data.drinks;
      return cocktailsByCategory;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des cocktails par catégorie :",
        error
      );
      return [];
    }
  };

  const renderCocktailItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRecipeDetailPage(item)}>
      <View style={styles.cocktailItem}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.cocktailImage}
        />
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToRecipeDetailPage = (cocktail) => {
    navigation.navigate("RecipeDetail", { cocktail });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Catégorie : {category}
      </Text>
      <FlatList
        data={cocktails}
        renderItem={renderCocktailItem}
        keyExtractor={(item) => item.idDrink}
        ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
}

export default CategoryDetailPage;
