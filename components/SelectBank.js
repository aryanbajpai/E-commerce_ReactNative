import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import hdfc from "../assets/Img/HDFC.png";
import icici from "../assets/Img/ICICI.png";
import sbi from "../assets/Img/SBI.png";
import axis from "../assets/Img/AXIS.png";

const banks = [
  { id: 1, name: "HDFC", logo: hdfc },
  { id: 2, name: "ICICI", logo: icici },
  { id: 3, name: "State Bank of India", logo: sbi },
  { id: 4, name: "Axis Bank", logo: axis },
];

export default function SelectBank({ navigation, route }) {
  const { totalAmt } = route?.params;
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Search for bank"
        containerStyle={{
          backgroundColor: "#48426d",
          borderColor: "#48426d",
          marginTop: 7,
        }}
        inputContainerStyle={{ backgroundColor: "#312c51" }}
        inputStyle={{ color: "white" }}
        placeholderTextColor={"#fff"}
        round
      />

      <View>
        <Text style={styles.topic}>Top banks</Text>

        {banks.map((bank) => (
          <>
            <TouchableOpacity
              key={bank.id}
              style={styles.radioButton}
              onPress={() => setSelectedBank(bank.id)}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <View style={styles.radioCircle}>
                  {selectedBank === bank.id && (
                    <View style={styles.selectedCircle} />
                  )}
                </View>
                <Text style={styles.bankName}>{bank.name}</Text>
              </View>
              <View>
                <Image source={bank.logo} style={{ width: 25, height: 25 }} />
              </View>
            </TouchableOpacity>

            {selectedBank === bank.id && (
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
            )}
          </>
        ))}
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
    fontStyle: "italic",
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
