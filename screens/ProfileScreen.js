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
          <Image source={profilePic} style={{ width: 170, height: 170 }} />
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.userDetailsText}>
            Username: <Text style={{ color: "#dfdfdf" }}>{username}</Text>
          </Text>
          <Text style={styles.userDetailsText}>
            Gender: <Text style={{ color: "#dfdfdf" }}>{gender}</Text>
          </Text>
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
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#fff",
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  userDetails: {
    marginVertical: 10,
    backgroundColor: "#312c51",
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#fff",
  },
  userDetailsText: {
    fontSize: 20,
    fontWeight: "bold", // Use 'bold' or numeric values
    color: "#f0c38e",
    marginVertical: 4,
  },
  btn: {
    backgroundColor: "#312c51", // Background color of the button
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#f0c38e",
    fontSize: 17,
    fontWeight: "bold",
  },
});
