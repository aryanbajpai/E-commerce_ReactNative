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
} from "react-native";

const mtCart = require("../assets/mtCart.png");

export default function Cart({navigation}) {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const platformChrg = price*0.05;
  const roundOff = parseFloat(platformChrg.toFixed(2));

  const totalAmt = roundOff + price;

  const handleOrder = () => {
    navigation.navigate('Order Summary')
  }

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
            {cart?.map((i, key) => (
              <View key={key} style={styles.cartItemContainer}>
                <Image source={i.img} style={{ width: 100, height: 120 }} />
                <View style={{ width: 190 }}>
                  <Text style={styles.prdtName}>{i.prdtName}</Text>
                  <Text style={styles.desc}>{i.desc}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.price}>₹{i.price}</Text>
                </View>
              </View>
            ))}

            <View style={styles.priceDetailsSection}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#f0c38e" }}
              >
                Price Details
              </Text>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>Items</Text>
                <Text style={styles.commonTextStyle}>{cart.length}</Text>
              </View>

              <View style={styles.billing}>
                <Text style={styles.commonTextStyle}>Platform Charge (+5%)</Text>
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
                  style={{ fontSize: 18, fontWeight: "bold", color: "#f0c38e" }}
                >
                  Total
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#f0c38e" }}
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
              }}
            >
              <Text style={styles.topic}>₹ {totalAmt}</Text>
              <TouchableOpacity style={styles.placeOrderBtn} onPress={handleOrder}>
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
    fontSize: 25,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "white",
  },
  prdtName: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  desc: {
    marginTop: 3,
    fontSize: 16,
    color: "gray",
  },
  price: {
    fontSize: 23,
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
    fontSize: 17,
    color: "#fff",
  },
  placeOrderBtn: {
    backgroundColor: "#f0c38e",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  placeOrderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
