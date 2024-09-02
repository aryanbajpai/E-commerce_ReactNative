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
import { prdtArray } from "../DummyData";


const PrdtCards = () => {
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
    height: 200,
  },
  details: {
    padding: 8,
  },
  prdtTitle: {
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  prdtDesc: {
    fontSize: 15,
    color: "gray",
    fontStyle: 'italic'
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3f3f3f",
  },
  discount: {
    fontSize: 15,
    color: "green",
    fontStyle: 'italic'
  },
});

export default PrdtCards;
