import React from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

export default function Prdtdetails({ route }) {
  const { item } = route.params; // Extract the item from route.params

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.topic}>Product Details</Text>
        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image source={item.img} style={styles.image} />
          </View>

          <View style={{backgroundColor: '#312c51', borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#f3f3f3' }}>
            <Text style={styles.prdtTitle}>{item.prdtName}</Text>
            <Text style={styles.prdtDesc}>{item.desc}</Text>
            <Text style={styles.price}>
              ₹{item.price}{" "}
              <Text style={styles.discount}>({item.discountPerc}% OFF)</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.button}>
        <Pressable style={styles.addCart}>
          <Text style={styles.commonText}>Add to cart</Text>
        </Pressable>

        <Pressable style={styles.buy}>
          <Text style={styles.commonText}>Buy now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  image: {
    width: "82%",
    height: 330,
    borderRadius: 8,
    marginBottom: 16,
  },
  prdtTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#f0c38e',
    fontStyle: 'italic',
  },
  prdtDesc: {
    fontSize: 17,
    color: "darkgray",
    fontStyle: "italic",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  discount: {
    fontSize: 16,
    color: "lightgreen",
  },
  button: {
    flexDirection: "row",
    position: "fixed",
  },
  addCart: {
    width: "50%",
    backgroundColor: "#f1f1f1",
  },
  buy: {
    width: "50%",
    backgroundColor: "#f0c38e",
  },
  commonText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
  },
});
