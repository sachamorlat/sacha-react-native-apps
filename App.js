import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import FavoritesPage from "./components/FavoritesPage";
// import AdditionalPage from "./components/AdditionalPage";

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
          options={{ tabBarLabel: "Cocktails" }}
        />
        <Tab.Screen
          name="Mes cockatails favoris : "
          component={FavoritesPage}
          options={{ tabBarLabel: "Favoris" }}
        />
        {/* <Tab.Screen name="Additional" component={AdditionalPage} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
