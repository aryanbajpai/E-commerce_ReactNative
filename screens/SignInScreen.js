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
  StatusBar,
} from "react-native";

const login = require('../assets/login.png')

export default function SignInScreen({ onSignIn }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (name && username && password) {
      onSignIn(name, username, password);
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>Let's begin</Text>

        <View style={styles.formContainer}>
          <Image source={login} style={{width:300, height: 280}} />

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
            <Text style={styles.label}>Username: </Text>
            <TextInput
              value={username}
              style={styles.inputField}
              placeholder="Enter username"
              placeholderTextColor="#f0c38e"
              onChangeText={setUserName}
            />
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
  topic: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 16,
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
    backgroundColor: '#48426d',
    height: 50,
    borderRadius: 10,
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
});
