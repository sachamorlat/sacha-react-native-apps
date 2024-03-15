import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import FavoritesPage from "./components/FavoritesPage";
import CategoryPage from "./components/CategoryPage";
import CategoryDetailPage from "./components/CategoryDetailPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerTitle: "Liste des cocktails : " }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailPage}
        options={{ headerTitle: "Détail de la recette : " }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailPage}
        options={{ headerTitle: "Catégorie de boisson : " }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Cocktails"
          component={HomeStack}
          options={{
            tabBarLabel: "Cocktails",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/cocktail.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Catégories de Cocktails"
          component={CategoryPage}
          options={{
            tabBarLabel: "Catégories de Cocktails",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/category.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Mes cocktails favoris"
          component={FavoritesPage}
          options={{
            tabBarLabel: "Favoris",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/favorite-icon.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
