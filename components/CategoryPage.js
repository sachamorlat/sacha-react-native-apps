import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  categoryList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryItem: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => {
        // Récupérer uniquement les noms des catégories
        const categoryNames = data.drinks.map((drink) => drink.strCategory);
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Liste des catégories :
      </Text>
      <View style={styles.categoryList}>
        {categories.map((category, index) => (
          <Text key={index} style={styles.categoryItem}>
            {category}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default CategoryPage;
