import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  weatherCard: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    height: 200,
    opacity: 0.7,
  },
  weatherInfo: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    opacity: 0.7,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherDataLocation: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 20,
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
