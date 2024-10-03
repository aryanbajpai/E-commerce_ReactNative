import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Prdtdetails({ navigation, route }) {
  const { item } = route?.params; // Extract the item from route.params
  const [cartData, setCartData] = useState([]);

  const price = item?.price;
  const platformChrg = price * 0.025;
  const roundOff = parseFloat(platformChrg.toFixed(2));
  const totalAmt = roundOff + price;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCartData = await AsyncStorage.getItem("cartData");
        if (storedCartData) {
          setCartData(JSON.parse(storedCartData));
        }
      } catch (error) {
        console.log("Failed to fetch data.", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async () => {
    try {
      //get initial Cart data from Storage
      let initialCart = await AsyncStorage.getItem("cartData");
      let cartItems = initialCart ? JSON.parse(initialCart) : [];

      //Add new Item
      cartItems.push(item);
      await AsyncStorage.setItem("cartData", JSON.stringify(cartItems));

      setCartData(cartItems);

      Alert.alert("Item Added", `${item.prdtName} successfully added to cart.`);
    } catch (error) {
      console.log("Error Occured while adding Data to AsyncStorage", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await AsyncStorage.setItem("orderData", JSON.stringify([item]));
      navigation.navigate("Order Summary", { isBuyNow: true, totalAmt, roundOff, price});
    } catch (error) {
      console.log("Error occurred while storing DATA to Storage: ", error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.topic}>Product Details</Text>
          <View style={{ marginRight: 10, position: "relative" }}>
            <Ionicons name="cart" size={32} color={"#fff"} />
            <View
              style={{
                backgroundColor: "red",
                borderRadius: 20,
                position: "absolute",
                paddingHorizontal: 6,
                right: -8,
                top: -5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {cartData.length}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image source={item?.img} style={styles.image} />
          </View>

          <View style={styles.details}>
            <Text style={styles.prdtTitle}>{item?.prdtName}</Text>
            <Text style={styles.prdtDesc}>{item?.desc}</Text>
            <Text style={styles.price}>
              ₹{item?.price}{" "}
              <Text style={styles.discount}>({item?.discountPerc}% OFF)</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.button}>
        <Pressable style={styles.addCart} onPress={handleAddToCart}>
          <Text style={styles.commonText}>Add to cart</Text>
        </Pressable>

        <Pressable style={styles.buy} onPress={handleBuyNow}>
          <Text style={styles.commonText}>Buy now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#48426d",
    position: "relative",
  },
  topic: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
    textAlign: "center",
  },
  detailsContainer: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  details: {
    backgroundColor: "#312c51",
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  image: {
    width: "82%",
    height: 330,
    borderRadius: 8,
    marginBottom: 16,
  },
  prdtTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f0c38e",
    fontStyle: "italic",
  },
  prdtDesc: {
    fontSize: 16,
    color: "darkgray",
    fontStyle: "italic",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dfdfdf",
  },
  discount: {
    fontSize: 16,
    color: "lightgreen",
    fontStyle: "italic",
  },
  button: {
    flexDirection: "row",
    position: "fixed",
  },
  addCart: {
    width: "50%",
    backgroundColor: "#f0f0f0",
  },
  buy: {
    width: "50%",
    backgroundColor: "#f0c38e",
  },
  commonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
  },
});
