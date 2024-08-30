import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mtCart = require("../assets/mtCart.png");

export default function Cart({ navigation }) {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const platformChrg = price * 0.05;
  const roundOff = parseFloat(platformChrg.toFixed(2));

  const totalAmt = roundOff + price;

  const handleOrder = () => {
    navigation.navigate("Order Summary");
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cartData");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCart(parsedCart);
          // Calculate total price
          const total = parsedCart.reduce((sum, item) => sum + item.price, 0);
          //reduce method: helps Cal total price of items in array
          //sum: Holds the result initially 0 = Accumulator
          //item: current element of array that gets added to sum and updates it
          setPrice(total);
        } else {
          setPrice(0);
        }
      } catch (error) {
        console.log("Error while fetching Data", error);
      }
    };

    fetchCartData();
  }, []);

  const remove = async (id) => {
    try {
      const storedCart = await AsyncStorage.getItem("cartData");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        
        const updatedCart = parsedCart.filter(item => item.id !== id);
        
        // Save the updated cart back to AsyncStorage
        await AsyncStorage.setItem("cartData", JSON.stringify(updatedCart));
        
        setCart(updatedCart);
  
        const total = updatedCart.reduce((sum, item) => sum + item.price, 0);
        setPrice(total);
      }
    } catch (error) {
      console.log("Error while removing item from cart", error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {cart.length === 0 ? (
          <>
            <View style={styles.mtCartContainer}>
              <Image source={mtCart} style={{ width: 325, height: 325 }} />
            </View>
            <Text style={styles.topic}>...Cart is Empty...</Text>
          </>
        ) : (
          <>
            {cart?.map((i) => (
              <View key={i?.id} style={styles.cartItemContainer}>
                <Image source={i?.img} style={{ width: 100, height: 120 }} />
                <View style={{ width: 200 }}>
                  <Text style={styles.prdtName}>{i?.prdtName}</Text>
                  <Text style={styles.desc}>{i?.desc}</Text>
                  <Text style={styles.price}>₹{i?.price}</Text>
                </View>
                <Pressable onPress={() => remove(i?.id)} style={styles.icons}>
                  <Ionicons name="trash-bin" size={20} color={"red"} />
                </Pressable>
              </View>
            ))}

            <View style={styles.priceDetailsSection}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#f0c38e" }}
              >
                Price Details
              </Text>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>Items</Text>
                <Text style={styles.commonTextStyle}>{cart.length}</Text>
              </View>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>
                  Platform Charge (+5%)
                </Text>
                <Text style={[styles.commonTextStyle, { color: "lightgreen" }]}>
                  +{roundOff}
                </Text>
              </View>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>Price</Text>
                <Text style={[styles.commonTextStyle, { color: "lightgreen" }]}>
                  +{price}
                </Text>
              </View>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>Delivery Charge</Text>
                <Text style={[styles.commonTextStyle, { color: "lightgreen" }]}>
                  Free
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "darkgray",
                  height: 1,
                  marginVertical: 8,
                }}
              ></View>

              <View
                style={[
                  styles.billing,
                  {
                    backgroundColor: "#48426d",
                    paddingVertical: 10,
                    borderRadius: 10,
                  },
                ]}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#f0c38e" }}
                >
                  Total
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#f0c38e" }}
                >
                  ₹{totalAmt}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text style={styles.topic}>₹ {totalAmt} </Text>
              <TouchableOpacity
                style={styles.placeOrderBtn}
                onPress={handleOrder}
              >
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#48426d",
  },
  topic: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 14,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
  },
  mtCartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
  },
  cartItemContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "white",
    position: "relative",
  },
  icons: {
    position: "absolute",
    right: 8,
    bottom: 5,
  },
  prdtName: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  desc: {
    marginTop: 3,
    fontSize: 16,
    color: "gray",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#5f5f5f",
  },
  priceDetailsSection: {
    width: "100%",
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#312c51",
    borderWidth: 1,
    borderColor: "darkgray",
  },
  billing: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  commonTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  placeOrderBtn: {
    backgroundColor: "#f0c38e",
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 14,
  },
  placeOrderText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
});
