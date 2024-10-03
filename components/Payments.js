import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Payment({ navigation, route }) {
  const { totalAmt } = route?.params || { totalAmt: 0 }; // Default to 0 if not provided
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedUpi, setSelectedUpi] = useState(null);

  const upi = [
    { id: 1, name: "Google Pay" },
    { id: 2, name: "PhonePe" },
    { id: 3, name: "Paytm" },
  ];

  const gateways = [
    { icon: "card", label: "Credit / Debit / ATM Card" },
    { icon: "business", label: "Net Banking" },
    { icon: "wallet", label: "UPI" },
    { icon: "cash", label: "Cash on Delivery" },
  ];

  const addBank = () => {
    navigation.navigate("Select Bank", { totalAmt });
  };

  const toggleGateway = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const placeOrder = () => {
    Alert.alert(
      'Confirm cash on delivery',
      'Are you sure you want to confirm your order?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Order cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => console.log('Order confirmed'),
          style: 'default',
        },
      ],
      { cancelable: false } // Optionally prevent closing on outside tap
    );
  };

  const paymentProcess = () => {
    navigation.navigate('Payment Gateway')
  }

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
            <TouchableOpacity style={styles.gateways} onPress={() => toggleGateway(index)}>
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
            </TouchableOpacity>
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
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "48.5%" }}>
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

                      <View style={{ width: "48.5%" }}>
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
                {gateway.icon === "business" && (
                  <View>
                    <TouchableOpacity onPress={addBank}>
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
                        Select Bank
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {gateway.icon === "wallet" && (
                  <>
                    {upi.map((upi) => (
                      <>
                        <TouchableOpacity
                          key={upi.id}
                          style={styles.radioButton}
                          onPress={() => setSelectedUpi(upi.id)}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 5,
                            }}
                          >
                            <View style={styles.radioCircle}>
                              {selectedUpi === upi.id && (
                                <View style={styles.selectedCircle} />
                              )}
                            </View>
                            <Text style={styles.bankName}>{upi.name}</Text>
                          </View>
                        </TouchableOpacity>

                        {selectedUpi === upi.id && (
                          <TouchableOpacity onPress={paymentProcess}>
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
                        )}
                      </>
                    ))}
                  </>
                )}
                {gateway.icon === "cash" && (
                  <View>
                    <Text style={{color: '#fff', fontSize: 17, marginBottom: 3}}>
                      Due to handling costs, a nominal fee of ₹7 will be charged
                    </Text>
                    <TouchableOpacity onPress={placeOrder}>
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
                        Place Order
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#f0c38e",
  },
  bankName: {
    color: "#fff",
    fontSize: 18,
  },
});
