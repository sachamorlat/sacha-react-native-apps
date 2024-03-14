import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const HomePage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCocktails().then((data) => {
      setCocktails(data);
    });
  }, []);

  const renderCocktailItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RecipeDetail", { cocktail: item })
      }
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

  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
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
