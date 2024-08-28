import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen"; // Ensure the correct path and component name
import SignInScreen from "./screens/SignInScreen"; // Correct import name
import ProfileScreen from "./screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Pressable, Text, Image, Alert } from "react-native";
import LogInScreen from "./screens/LogInScreen";

const maleProfile = require("./assets/male.png");
const femaleProfile = require("./assets/female.png");
const kidProfile = require("./assets/kid.png");

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    // Check authentication status on startup
    const checkAuthStatus = async () => {
      try {        
        const signedIn = await AsyncStorage.getItem("isSignedIn");
        if (signedIn === "true") {
          const storedName = await AsyncStorage.getItem("name");
          const storedUsername = await AsyncStorage.getItem("username");
          const storedPassword = await AsyncStorage.getItem("password");
          const storedGender = await AsyncStorage.getItem("gender");
          if (storedName && storedUsername && storedPassword && storedGender) {
            setName(storedName);
            setUserName(storedUsername);
            setPassword(storedPassword);
            setGender(storedGender);
            setIsSignedIn(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch authentication status", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogIn = async (username, password) => {
    try {
      let userData = await AsyncStorage.getItem("users");
      let users = userData ? JSON.parse(userData) : [];

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        setIsSignedIn(true);
        setUserName(username);
        setPassword(password);
        setName(user.name);
        setGender(user.gender);
        await AsyncStorage.setItem("isSignedIn", "true");
        await AsyncStorage.setItem("name", user.name);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("gender", user.gender);
      } else {
        setIsSignedIn(false);
        Alert.alert("Login Failed", "Please enter valid details!");
      }
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      await AsyncStorage.removeItem("gender");
      setIsSignedIn(false);
      setName("");
      setUserName("");
      setPassword("");
      setGender("");
    } catch (error) {
      console.error("Failed to clear authentication status", error);
    }
  };

  const handleSignIn = async (name, username, password, gender) => {
    try {
      let userData = await AsyncStorage.getItem("users");
      let users = userData ? JSON.parse(userData) : [];

      // const existingUser = users.find(user => user.username === username);

      // if (existingUser) {
      //   Alert.alert("Username Taken", "Please choose a different username.");
      // } else {
        const newUser = { name, username, gender, password };
        users.push(newUser);
        await AsyncStorage.setItem("users", JSON.stringify(users));
        console.log(users)

        await AsyncStorage.setItem("isSignedIn", "true");
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("gender", gender);

        setIsSignedIn(true);
        setName(name);
        setUserName(username);
        setPassword(password);
        setGender(gender);
      // }
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      await AsyncStorage.removeItem("gender");
      setIsSignedIn(false);
      setName("");
      setUserName("");
      setPassword("");
      setGender("");
    } catch (error) {
      console.error("Failed to clear authentication status", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedIn ? "Home" : "Signin"}
        screenOptions={{
          //for all the screens
          headerStyle: {
            backgroundColor: "#312c51",
          },
          headerTintColor: "#f0c38e",
          headerTitleStyle: { fontWeight: "bold", fontSize: 27 },
          contentStyle: {
            backgroundColor: "#df643f",
          },
        }}
      >
        <>
          <Stack.Screen
            name="Home"
            options={({ navigation }) => ({
              headerRight: () =>
                isSignedIn ? (
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    {gender === "Male" ? (
                      <Image
                        source={maleProfile}
                        style={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Image
                        source={femaleProfile}
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: "#48426d",
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                    onPress={() => navigation.navigate("LogIn")}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#f0c38e",
                        fontWeight: "600",
                      }}
                    >
                      Log In
                    </Text>
                  </Pressable>
                ),
            })}
          >
            {(props) => (
              <HomeScreen
                {...props}
                name={name}
                username={username}
                password={password}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {(props) => (
              <ProfileScreen
                {...props}
                name={name}
                username={username}
                password={password}
                gender={gender}
                onLogOut={handleLogOut} // Pass sign-out handler
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="LogIn">
            {(props) => (
              <LogInScreen
                {...props}
                onLogIn={handleLogIn} // Pass sign-in handler
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="SignIn">
            {(props) => (
              <SignInScreen
                {...props}
                onSignIn={handleSignIn} // Pass sign-in handler
              />
            )}
          </Stack.Screen>
        </>
        {/* ) : (
          <>
            <Stack.Screen name="Sign In">
              {(props) => (
                <SignInScreen
                  {...props}
                  onSignIn={handleSignIn} // Pass sign-in handler
                />
              )}
            </Stack.Screen>
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
