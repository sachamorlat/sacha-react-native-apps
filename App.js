import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import RecipeDetailPage from "./components/RecipeDetailPage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
