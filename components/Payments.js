import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Payment({ navigation, route }) {
  const { totalAmt } = route?.params;
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which gateway is expanded

  const gateways = [
    { icon: "card", label: "Credit / Debit / ATM Card" },
    { icon: "business", label: "Net Banking" },
    { icon: "wallet", label: "UPI" },
    { icon: "cash", label: "Cash on Delivery" },
  ];

  const toggleGateway = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the expanded state
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.totalAmtContainer}>
        <Text style={styles.totalAmtText}>Total Amount </Text>
        <Text style={styles.totalAmtText}> ₹{totalAmt} </Text>
      </View>

      <View>
        {gateways.map((ways, index) => (
          <View
            key={index}
            style={{
              paddingVertical: 15,
              backgroundColor:
                expandedIndex === index ? "#312c51" : "transparent", // Conditional background color
            }}
          >
            <View style={styles.gateways}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name={ways.icon} size={30} color={"#f1f1f1"} />
                <Text
                  style={{ color: "#f1f1f1", fontSize: 20, fontWeight: "bold" }}
                >
                  {ways.label}
                </Text>
              </View>
              <Pressable onPress={() => toggleGateway(index)}>
                <Ionicons name="chevron-down" size={30} color={"#f1f1f1"} />
              </Pressable>
            </View>
            {expandedIndex === index && (
              <View
                style={{
                  marginHorizontal: 18,
                  marginTop: 12,
                  padding: 15,
                  backgroundColor: "#48426d",
                  borderRadius: 8,
                }}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f0c38e'}}>Card Number</Text>
                <TextInput
                  placeholder="XXXX XXXX XXXX XXXX"
                  placeholderTextColor="#bfbfbf"
                  style={styles.inputField}
                />
                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 19,
                      fontWeight: "bold",
                      backgroundColor: '#f0c38e',
                      paddingVertical: 8,
                      borderRadius: 7,
                      marginTop: 6,
                      color: '#48426d'
                    }}
                  >
                    Pay ₹{totalAmt}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48426d",
  },
  totalAmtContainer: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 25,
    backgroundColor: "#f0c38e",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1.5,
  },
  totalAmtText: {
    color: "#312c51",
    fontSize: 20,
    fontWeight: "bold",
  },
  gateways: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    marginVertical: 10,
    backgroundColor: "#312c51",
    color: "#fff",
  },
});
