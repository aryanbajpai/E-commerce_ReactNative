import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import PrdtCards from "../components/PrdtCards";

export default function HomeScreen({ name }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>Welcome, {name}</Text>

        <SearchBar
          placeholder="Search here..."
          containerStyle={{ backgroundColor: "#fff", borderColor: '#fff' }}
          inputContainerStyle={{backgroundColor: '#fff', borderWidth: 1,}}
          inputStyle={{color: 'white'}}
          placeholderTextColor={{color: '#48426d'}}
          round
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <PrdtCards />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2f2f2f",
  },
});
