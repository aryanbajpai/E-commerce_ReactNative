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
  const { totalAmt } = route?.params || { totalAmt: 0 }; // Default to 0 if not provided
  const [expandedIndex, setExpandedIndex] = useState(null);

  const gateways = [
    { icon: "card", label: "Credit / Debit / ATM Card" },
    { icon: "business", label: "Net Banking" },
    { icon: "wallet", label: "UPI" },
    { icon: "cash", label: "Cash on Delivery" },
  ];

  const toggleGateway = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.totalAmtContainer}>
        <Text style={styles.totalAmtText}>Total Amount </Text>
        <Text style={styles.totalAmtText}> ₹{totalAmt} </Text>
      </View>

      <View>
        {gateways.map((gateway, index) => (
          <View
            key={index}
            style={{
              paddingVertical: 15,
              backgroundColor:
                expandedIndex === index ? "#312c51" : "transparent",
            }}
          >
            <View style={styles.gateways}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Ionicons name={gateway.icon} size={30} color={"#f1f1f1"} />
                <Text
                  style={{ color: "#f1f1f1", fontSize: 20, fontWeight: "bold" }}
                >
                  {gateway.label}
                </Text>
              </View>
              <Pressable onPress={() => toggleGateway(index)}>
                <Ionicons
                  name="chevron-down"
                  size={30}
                  color={"#f1f1f1"}
                  style={{
                    transform: [
                      { rotate: expandedIndex === index ? "180deg" : "0deg" },
                    ],
                  }}
                />
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
                {gateway.icon === "card" && (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#f0c38e",
                      }}
                    >
                      Card Number
                    </Text>
                    <TextInput
                      placeholder="XXXX XXXX XXXX XXXX"
                      placeholderTextColor="#bfbfbf"
                      style={styles.inputField}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
                      <View style={{width:'48.5%'}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#f0c38e",
                          }}
                        >
                          Expiration Date
                        </Text>
                        <TextInput
                          placeholder="MM/YY"
                          placeholderTextColor="#bfbfbf"
                          style={styles.inputField}
                        />
                      </View>

                      <View style={{width:'48.5%'}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#f0c38e",
                          }}
                        >
                          CVV
                        </Text>
                        <TextInput
                          placeholder="XXX"
                          placeholderTextColor="#bfbfbf"
                          style={styles.inputField}
                          secureTextEntry // Optionally hide the CVV input
                        />
                      </View>
                    </View>

                    <TouchableOpacity>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 19,
                          fontWeight: "bold",
                          backgroundColor: "#f0c38e",
                          paddingVertical: 8,
                          borderRadius: 7,
                          marginTop: 6,
                          color: "#48426d",
                        }}
                      >
                        Pay ₹{totalAmt}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* Add logic for other gateways here */}
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
