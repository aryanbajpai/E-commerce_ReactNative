import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

const watch = require("../assets/watch.jpg");
const clothes = require("../assets/cloth.jpg");
const phone = require("../assets/phone.jpg");
const crocks = require("../assets/crocks.jpg");

const PrdtCards = () => {
  const prdtArray = [
    {
      id: 1,
      img: watch,
      prdtName: "Horizen",
      desc: "Description for product comes here",
      price: 500,
      discountPerc: 50,
    },
    {
      id: 2,
      img: clothes,
      prdtName: "H&M",
      desc: "Description for product comes here",
      price: 1199,
      discountPerc: 30,
    },
    {
      id: 3,
      img: phone,
      prdtName: "Vivo Y100",
      desc: "Description for product comes here",
      price: 2499,
      discountPerc: 25,
    },
    {
      id: 4,
      img: crocks,
      prdtName: "Milton",
      desc: "Description for product comes here",
      price: 1449,
      discountPerc: 23,
    },
    {
      id: 5,
      img: watch,
      prdtName: "Horizen",
      desc: "Description for product comes here",
      price: 500,
      discountPerc: 50,
    },
    {
      id: 6,
      img: clothes,
      prdtName: "H&M",
      desc: "Description for product comes here",
      price: 1199,
      discountPerc: 30,
    },
    {
      id: 7,
      img: phone,
      prdtName: "Vivo Y100",
      desc: "Description for product comes here",
      price: 2499,
      discountPerc: 25,
    },
    {
      id: 8,
      img: crocks,
      prdtName: "Milton",
      desc: "Description for product comes here",
      price: 1449,
      discountPerc: 23,
    },
  ];
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("Product", { item });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => handlePress(item)}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.prdtTitle}>{item.prdtName}</Text>
        <Text style={styles.prdtDesc}>{item.desc}</Text>
        <Text style={styles.price}>
          ₹{item.price}{" "}
          <Text style={styles.discount}>({item.discountPerc}% OFF)</Text>
        </Text>
      </View>
    </Pressable>
  );

  return (
      <FlatList
        data={prdtArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.container}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginBottom: 13,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  image: {
    width: "100%",
    height: 210,
  },
  details: {
    padding: 8,
  },
  prdtTitle: {
    fontSize: 21,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  prdtDesc: {
    fontSize: 15,
    color: "gray",
  },
  price: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3f3f3f",
  },
  discount: {
    fontSize: 15,
    color: "green",
  },
});

export default PrdtCards;
