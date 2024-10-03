import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
} from "react-native";

export default function Orders() {
  const [purchasedData, setPurchasedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedData = async () => {
      try {
        const data = await AsyncStorage.getItem("purchasedItems");
        if (data) {
          const parsedData = JSON.parse(data);
          setPurchasedData(parsedData); // Parse and set the state
        }
      } catch (error) {
        console.error("Failed to fetch purchase data:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchPurchasedData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#f0c38e"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{paddingVertical: 10}}>
        {purchasedData.map((order, index) => (
          <View key={index} style={styles.orderContainer}>
            {order.items.map((data) => (
              <View key={data.id} style={styles.itemCard}>
                <View>
                  <Image source={data.img} style={styles.itemImage} />
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{data.prdtName}</Text>
                  <Text style={styles.itemPrice}>
                    ₹{data.price}{" "}
                    <Text style={styles.itemDiscount}>
                      ({data.discountPerc}% OFF)
                    </Text>
                  </Text>
                  <Text
                    style={{ fontSize: 19, fontWeight: "500", marginTop: 5 }}
                  >
                    Quan:{" "}
                    <Text style={{ fontWeight: "bold", fontSize: 21 }}>
                      {data.quantity}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
            <Text style={styles.orderDate}>
              Date: {new Date(order.date).toLocaleDateString()}{" "}
            </Text>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#48426d",
  },
  orderContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  itemsContainer: {
    margin: 12,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
  orderDate: {
    fontSize: 16,
    textAlign: 'right',
    fontStyle: 'italic',
    color: 'gray',
  }
});
