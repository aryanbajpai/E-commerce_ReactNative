import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

const home = require("../assets/home.png");

export default function HomeScreen({
  name,
}) {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>Welcome, {name}</Text>

        <Image
          source={home}
          style={{
            width: 380,
            height: 490,
            marginBottom: 19,
            borderRadius: 10,
          }}
        />
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
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
});
