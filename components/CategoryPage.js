// CategoryDetailPage.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

const CategoryPage = ({ route, navigation }) => {
  const { category } = route.params;
  const [categoryDrinks, setCategoryDrinks] = useState([]);

  useEffect(() => {
    fetchCategoryDrinks();
  }, []);

  const fetchCategoryDrinks = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setCategoryDrinks(data.drinks || []);
    } catch (error) {
      console.error("Error fetching category drinks:", error);
    }
  };

  const renderCategoryDrinkItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DrinkDetail", { drink: item })}
      style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>{category}</Text>
      <FlatList
        data={categoryDrinks}
        renderItem={renderCategoryDrinkItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
};

export default CategoryPage;
