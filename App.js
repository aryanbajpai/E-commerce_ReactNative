import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen"; // Ensure the correct path and component name
import SignInScreen from "./screens/SignInScreen"; // Correct import name
import ProfileScreen from "./screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Pressable, Text, Image, Alert } from "react-native";
import LogInScreen from "./screens/LogInScreen";
import PrdtCards from "./components/PrdtCards";
import Prdtdetails from "./components/PrdtDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Notification from "./components/Notification";
import { Ionicons } from "@expo/vector-icons";
import OrderSummary from "./components/OrderSummary";
import AddressForm from "./components/AddressForm";
import Payment from "./components/Payments";
import SelectBank from "./components/SelectBank";

const maleProfile = require("./assets/male.png");
const femaleProfile = require("./assets/female.png");
const kidProfile = require("./assets/kid.png");

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function TabNavigator({
  name,
  username,
  password,
  navigation,
  gender,
  onLogOut,
}) {
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cartData");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItemCount(parsedCart.length);
        }
      } catch (error) {
        console.log("Error while fetching Data", error);
      }
    };

    fetchCartData();
  }, [cartItemCount]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f0c38e",
        },
        headerTintColor: "#48426d",
        headerTitleStyle: { fontWeight: "bold", fontSize: 23 },
        contentStyle: {
          backgroundColor: "#df643f",
        }, // Hide headers for tab screens if desired
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#f0c38e",
        tabBarInactiveTintColor: "#dfdfdf",
        tabBarActiveBackgroundColor: "#312c51",
        tabBarInactiveBackgroundColor: "#312c51",
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
        tabBarIconStyle: { marginTop: 5 },
      }}
    >
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            name={name}
            username={username}
            password={password}
            gender={gender}
            onLogOut={onLogOut}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={23} color={color} />
          ),
          tabBarBadge: cartItemCount,
          tabBarBadgeStyle: { marginLeft: 4 },
        }}
      >
        {(props) => (
          <Cart {...props} setCartItemCount={setCartItemCount} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
          tabBarBadge: 0,
          tabBarBadgeStyle: { marginLeft: 2 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
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

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

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
      const newUser = { name, username, gender, password };
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

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
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#312c51",
          },
          headerTintColor: "#f0c38e",
          headerTitleStyle: { fontWeight: "bold", fontSize: 26 },
          contentStyle: {
            backgroundColor: "#df643f",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            headerRight: () =>
              isSignedIn ? (
                <Pressable onPress={() => navigation.navigate("Account")}>
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
                    backgroundColor: "#88ffff",
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                  }}
                  onPress={() => navigation.navigate("LogIn")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#106ad2",
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
              onLogOut={handleLogOut}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="LogIn">
          {(props) => <LogInScreen {...props} onLogIn={handleLogIn} />}
        </Stack.Screen>

        <Stack.Screen name="SignIn">
          {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
        </Stack.Screen>

        <Stack.Screen name="Account">
          {(props) => (
            <TabNavigator
              {...props}
              name={name}
              username={username}
              password={password}
              gender={gender}
              onLogOut={handleLogOut}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Product" component={Prdtdetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Order Summary" component={OrderSummary} />
        <Stack.Screen name="Add Address" component={AddressForm} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Select Bank" component={SelectBank} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
