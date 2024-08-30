import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import PrdtCards from "../components/PrdtCards";

export default function HomeScreen({ name }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topic}>Welcome, {name}</Text>

      <SearchBar
        placeholder="Search here..."
        containerStyle={{ backgroundColor: "#48426d", borderColor: "#48426d" }}
        inputContainerStyle={{ backgroundColor: "#312c51" }}
        inputStyle={{ color: "white" }}
        placeholderTextColor={{ color: "#fff" }}
        round
        value={searchValue}
        onChangeText={setSearchValue}
      />

      <PrdtCards />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#48426d",
  },
  topic: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
});
