import { ScrollView, SafeAreaView, Text, StyleSheet } from "react-native";

export default function Orders() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>My Orders</Text>
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
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
});
