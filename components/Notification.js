import { ScrollView, SafeAreaView, Text, StyleSheet } from "react-native";

export default function Notification() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.topic}>No notifications yet...</Text>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: "#48426d",
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
});
