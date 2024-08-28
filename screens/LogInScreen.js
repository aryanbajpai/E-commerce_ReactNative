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
  Pressable,
} from "react-native";

const login = require("../assets/login.png");

export default function LogInScreen({ onLogIn, navigation }) {
  //   const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    if (username && password) {
      onLogIn(username, password);
      navigation.navigate('Home');
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.formContainer}>
          <Image source={login} style={{ width: 300, height: 280 }} />

          {/* <View style={styles.commonInput}>
            <Text style={styles.label}>Name: </Text>
            <TextInput
              value={name}
              style={styles.inputField}
              placeholder="Enter your name"
              placeholderTextColor="#f0c38e"
              onChangeText={setName}
            />
          </View> */}

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

        <TouchableOpacity style={styles.btn} onPress={handleLogIn}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', gap:10, justifyContent: 'center'}}>
          <Text style={styles.label}>New to this?</Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.label, {color: 'lightblue'}]}>Sign In</Text>
          </Pressable>
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
    marginVertical: 10,
    color: "white",
    textAlign: "center",
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
