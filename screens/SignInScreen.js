import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";

const login = require("../assets/login.png");

export default function SignInScreen({ onSignIn, navigation }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [err, setErr] = useState("");

  const handleSignIn = async () => {
    if (name && username && password && gender) {
      try {
        let userData = await AsyncStorage.getItem("users");
        let users = userData ? JSON.parse(userData) : [];

        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
          setErr("*Username already taken!");
        } else {
          setErr("");
          await onSignIn(name, username, password, gender);
          navigation.navigate("TrendTrail");
        }
      } catch (error) {
        Alert.alert(
          "Sign-In Error",
          "An error occurred while trying to sign in. Please try again."
        );
        console.error("Sign-In failed:", error);
      }
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  const renderGenderOption = (value, label) => (
    <TouchableOpacity
      style={[
        styles.genderOption,
        gender === value && styles.genderOptionSelected,
      ]}
      onPress={() => setGender(value)}
    >
      <Text
        style={[
          styles.genderOptionText,
          gender === value && styles.genderOptionTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>

        <View style={styles.formContainer}>
          <Image source={login} style={{ width: 300, height: 280 }} />

          <View style={styles.commonInput}>
            <Text style={styles.label}>Name: </Text>
            <TextInput
              value={name}
              style={styles.inputField}
              placeholder="Enter your name"
              placeholderTextColor="#f0c38e"
              onChangeText={setName}
            />
          </View>

          <View style={styles.commonInput}>
            <Text style={styles.label}>Gender: </Text>
            <View style={styles.genderContainer}>
              {renderGenderOption("Male", "Male")}
              {renderGenderOption("Female", "Female")}
            </View>
          </View>

          <View style={styles.commonInput}>
            <Text style={styles.label}>Username: </Text>
            <TextInput
              value={username}
              style={styles.inputField}
              placeholder="Enter username"
              placeholderTextColor="#f0c38e"
              onChangeText={setUserName}
            />
            {err !== "" && (
              <Text style={styles.errMsg}>{err}</Text>
            )}
            
          </View>

          <View style={styles.commonInput}>
            <Text style={styles.label}>Password: </Text>
            <TextInput
              value={password}
              style={styles.inputField}
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#f0c38e"
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <Text style={styles.btnText}>Sign In</Text>
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
  formContainer: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 16,
    borderRadius: 10,
    backgroundColor: "#312c51",
    paddingBottom: 10,
  },
  commonInput: {
    width: "100%",
    paddingVertical: 8,
  },
  label: {
    fontSize: 20,
    color: "#fff",
  },
  inputField: {
    fontSize: 19,
    paddingVertical: 3,
    paddingHorizontal: 10,
    color: "#f0c38e",
    backgroundColor: "#48426d",
    height: 50,
    borderRadius: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  genderOption: {
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#48426d",
  },
  genderOptionSelected: {
    backgroundColor: "#f0c38e",
  },
  genderOptionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  genderOptionTextSelected: {
    color: "#312c51",
  },
  btn: {
    backgroundColor: "#f0c38e", // Background color of the button
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  btnText: {
    color: "#312c51",
    fontSize: 19,
    fontWeight: "bold",
  },
  errMsg: {
    fontSize: 18,
    color: "#f44336",
    textAlign: 'right',
    marginRight: 8,
  },
});
