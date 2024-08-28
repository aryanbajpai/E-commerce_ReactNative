import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";

const profilePic = require("../assets/profilrPic.png");

export default function ProfileScreen({
  name,
  username,
  password,
  navigation,
  gender,
  onLogOut,
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
          <Text style={styles.topic}> {name}</Text>
          <TouchableOpacity style={styles.btn} onPress={onLogOut}>
            <Text style={styles.btnText}>Log Out</Text>
          </TouchableOpacity>
        </View>

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
          <Text style={styles.userDetailsText}>Username: <Text style={{color: '#106ad2'}}>{username}</Text></Text>
          <Text style={styles.userDetailsText}>Gender: <Text style={{color: '#106ad2'}}>{gender}</Text></Text>
          <Text style={styles.userDetailsText}>Password: <Text style={{color: '#106ad2'}}>{password}</Text></Text>
        </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2f2f2f",
  },
  img: {
    width: 100, // Adjust the width and height as needed
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  userDetails: {
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8, // Optional: Add border-radius for a rounded corner effect
    borderWidth: 1,
    borderColor: '#106ad2',
  },
  userDetailsText: {
    fontSize: 22,
    fontWeight: "bold", // Use 'bold' or numeric values
    color: '#3f3f3f'
  },
  btn: {
    backgroundColor: "#fff", // Background color of the button
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#106ad2'
  },
  btnText: {
    color: "#106ad2",
    fontSize: 19,
    fontWeight: "bold",
  },
});
