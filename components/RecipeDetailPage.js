import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RecipeDetailPage = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
        );
        const data = await response.json();
        setCocktail(data.drinks[0]);
      } catch (error) {
        console.error("Error fetching cocktail details:", error);
      }
    };

    fetchCocktailDetails();
  }, [cocktailId]);

  if (!cocktail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  instructions: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default RecipeDetailPage;
