import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen"; // Ensure the correct path and component name
import SignInScreen from "./screens/SignInScreen"; // Correct import name
import ProfileScreen from "./screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check authentication status on startup
    const checkAuthStatus = async () => {
      try {
        const signedIn = await AsyncStorage.getItem("isSignedIn");
        if (signedIn === "true") {
          setIsSignedIn(true);
          const storedName = await AsyncStorage.getItem("name");
          const storedUsername = await AsyncStorage.getItem("username");
          const storedPassword = await AsyncStorage.getItem("password");
          if (storedName && storedUsername && storedPassword) {
            setName(storedName);
            setUserName(storedUsername);
            setPassword(storedPassword);
          }
        }
      } catch (error) {
        console.error("Failed to fetch authentication status", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSignIn = async (name, username, password) => {
    try {
      await AsyncStorage.setItem("isSignedIn", "true");
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      setIsSignedIn(true);
      setName(name);
      setUserName(username);
      setPassword(password);
    } catch (error) {
      console.error("Failed to save authentication status", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      setIsSignedIn(false);
      setName("");
      setUserName("");
      setPassword("");
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
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  name={name}
                  username={username}
                  password={password}
                  onSignOut={handleSignOut} // Pass sign-out handler
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
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
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
