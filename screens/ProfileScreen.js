import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  View,
} from "react-native";

const profilePic = require("../assets/profilrPic.png");

export default function ProfileScreen({ route }) {
  const { name, username, password } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>{name}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Image source={profilePic} style={{ width: 250, height: 250 }} />
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.userDetailsText}>Username: <Text style={{color: '#f1aa9b'}}>{username}</Text></Text>
          <Text style={styles.userDetailsText}>Password: <Text style={{color: '#f1aa9b'}}>{password}</Text></Text>
        </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
    textAlign: 'center',
  },
  img: {
    width: 100, // Adjust the width and height as needed
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  userDetails: {
    marginVertical: 10,
    backgroundColor: "#312c51",
    padding: 12,
    borderRadius: 8, // Optional: Add border-radius for a rounded corner effect
    borderWidth: 1,
    borderColor: 'white',
  },
  userDetailsText: {
    fontSize: 22,
    fontWeight: "bold", // Use 'bold' or numeric values
    color: '#f0c38e'
  },
});
