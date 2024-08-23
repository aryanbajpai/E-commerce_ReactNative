import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const home = require("../assets/home.png");

export default function HomeScreen({
  name,
  username,
  password,
  navigation,
  onSignOut,
}) {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            marginVertical: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.topic}>Welcome, {name}</Text>
          <TouchableOpacity style={styles.btn} onPress={onSignOut}>
            <Text style={styles.btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Image source={home} style={{ width: 380, height: 490, marginBottom: 19, borderRadius: 10 }} />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Profile", { name, username, password })
          }
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#48426d",
  },
  topic: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  user: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f0c38e",
  },
  highlight: {
    color: "#f1aa9b",
  },
  content: {
    borderWidth: 1,
    borderColor: "darkgray",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#312c51",
  },
  button: {
    backgroundColor: "#f0c38e", // Background color of the button
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#48426d",
    fontSize: 19,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#312c51", // Background color of the button
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#f0c38e",
    fontSize: 19,
    fontWeight: "bold",
  },
});
