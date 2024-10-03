import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function OrderSummary({ navigation, route }) {
  const { totalAmt, roundOff, price, isBuyNow } = route?.params;

  const [address, setAddress] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderItem, setOrderItem] = useState([]);

  const handleAddress = async () => {
    navigation.navigate("Add Address");
  };

  const fetchAddressData = async () => {
    try {
      const storedAddress = await AsyncStorage.getItem("address");
      if (storedAddress) {
        setAddress(JSON.parse(storedAddress));
      } else {
        setAddress({});
      }
    } catch (error) {
      console.log("Failed to fetch Address Data.", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem("cartData");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.log("Failed to fetch data.", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const storedOrderItem = await AsyncStorage.getItem("orderData");
      if (storedOrderItem) {
        setOrderItem(JSON.parse(storedOrderItem));
      }
    } catch (error) {
      console.log("Failed to fetch data.", error);
    }
  };

  const goToPayments = () => {
    if (isBuyNow) {
      navigation.navigate("Payment", { totalAmt, orderItem, cartItems: [] });
    } else {
      navigation.navigate("Payment", { totalAmt, orderItem: [], cartItems });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddressData(); // Fetch address when the screen is focused
      if (isBuyNow) {
        fetchOrderData();
      } else {
        fetchCartData();
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/*ADDRESS*/}
        <View style={styles.addressSection}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Deliver to: </Text>

            <TouchableOpacity style={styles.addressBtn} onPress={handleAddress}>
              <Text style={styles.addressBtnText}>
                {address && Object.keys(address).length > 0
                  ? "Change"
                  : "Add address"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressDetails}>
            <Text style={styles.addressName}>{address.fullName}</Text>
            {address && Object.keys(address).length > 0 && (
              <View>
                <Text style={styles.addressText}>{address.building},</Text>
                <Text style={styles.addressText}>{address.road},</Text>
                <Text style={styles.addressText}>
                  {address.city} {address.pincode}
                </Text>
                <Text style={styles.addressText}>{address.phoneNo}</Text>
              </View>
            )}
          </View>
        </View>

        {/*ITEMS*/}
        <View style={styles.itemsContainer}>
          {isBuyNow ? (
            <>
              {orderItem?.map((data) => (
                <View key={data?.id} style={styles.itemCard}>
                  <View>
                    <Image source={data?.img} style={styles.itemImage} />
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{data?.prdtName}</Text>
                    <Text style={styles.itemPrice}>
                      ₹{data?.price}{" "}
                      <Text style={styles.itemDiscount}>
                        ({data?.discountPerc}% OFF)
                      </Text>
                    </Text>
                    <Text
                      style={{ fontSize: 19, fontWeight: 500, marginTop: 5 }}
                    >
                      Quan:{" "}
                      <Text style={{ fontWeight: "bold", fontSize: 21 }}>
                        {data?.quantity}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              {cartItems?.map((data) => (
                <View key={data?.id} style={styles.itemCard}>
                  <View>
                    <Image source={data?.img} style={styles.itemImage} />
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{data?.prdtName}</Text>
                    <Text style={styles.itemPrice}>
                      ₹{data?.price}{" "}
                      <Text style={styles.itemDiscount}>
                        ({data?.discountPerc}% OFF)
                      </Text>
                    </Text>
                    <Text
                      style={{ fontSize: 19, fontWeight: 500, marginTop: 5 }}
                    >
                      Quan:{" "}
                      <Text style={{ fontWeight: "bold", fontSize: 21 }}>
                        {data?.quantity}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        {/*Price Details*/}
        <View style={styles.priceDetailsSection}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#f0c38e" }}>
            Price Details
          </Text>

          <View style={styles.billing}>
            <Text style={styles.commonTextStyle}>Items</Text>
            {orderItem.length === 0 ? (
              <Text
                style={[
                  styles.commonTextStyle,
                  { color: "#f0c38e", fontWeight: "bold" },
                ]}
              >
                {cartItems.length}
              </Text>
            ) : (
              <Text
                style={[
                  styles.commonTextStyle,
                  { color: "#f0c38e", fontWeight: "bold" },
                ]}
              >
                {orderItem.length}
              </Text>
            )}
          </View>

          <View style={styles.billing}>
            <Text style={styles.commonTextStyle}>Platform Charge (+2.5%)</Text>
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
      </ScrollView>

      {/*DONE */}
      <View style={styles.continueContainer}>
        <Text style={styles.priceText}>₹{totalAmt}</Text>
        <TouchableOpacity style={styles.continueBtn} onPress={goToPayments}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48426d",
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure ScrollView takes full height of its parent
    paddingBottom: 75,
  },
  addressSection: {
    marginTop: 14,
    backgroundColor: "#312c51",
    paddingBottom: 16,
  },
  addressContainer: {
    backgroundColor: "#312c51",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressBtn: {
    backgroundColor: "#f0c38e",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addressBtnText: {
    color: "#48426d",
    fontWeight: "bold",
    fontSize: 17,
  },
  addressTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  addressDetails: {
    paddingHorizontal: 13,
  },
  addressName: {
    fontWeight: "bold",
    color: "#f0c38e",
    fontSize: 19,
    marginBottom: 8,
  },
  addressText: {
    color: "#fff",
    fontSize: 17,
  },
  itemsContainer: {
    margin: 12,
  },
  itemCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
  },
  itemImage: {
    width: 120,
    height: 130,
    borderRadius: 8,
  },
  itemDetails: {
    marginHorizontal: 14,
    width: 180,
  },
  itemName: {
    fontSize: 21,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  itemPrice: {
    fontSize: 19,
    fontWeight: "600",
    color: "#3f3f3f",
  },
  itemDiscount: {
    color: "green",
    fontSize: 16,
    fontStyle: "italic",
  },
  continueContainer: {
    backgroundColor: "#f0c38e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderWidth: 2,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#312c51",
  },
  continueBtn: {
    backgroundColor: "#312c51",
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  continueBtnText: {
    color: "#f0c38e",
    fontWeight: "bold",
    fontSize: 18,
  },
  priceDetailsSection: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#312c51",
    borderWidth: 1,
    borderColor: "darkgray",
    marginHorizontal: 12,
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
});
