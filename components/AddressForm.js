import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

export default function AddressForm({navigation}) {
  const initialState = {
    fullName: "",
    phoneNo: "",
    pincode: "",
    city: "",
    sTATE: "",
    building: "",
    road: "",
  };
  const [state, setState] = useState(initialState);
  const [storedAddress, setStoredAddress] = useState([]);
  console.log(storedAddress)

  useEffect(() => {
    const oldAddress = async () => {
      try {
        const savedState = await AsyncStorage.getItem("address");
        if (savedState) {
            setStoredAddress(JSON.parse(savedState));
        }
      } catch (error) {
        console.log("Failed to load state from Storage.", error);
      }
    };

    oldAddress();
  }, []);

  const handleChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const savedData = async () => {
    try {
      await AsyncStorage.setItem("address", JSON.stringify(state));
      Alert.alert("Address added", "Address datat stored successfully.");
      console.log(state);
      setState(initialState);

      navigation.navigate('Order Summary');
    } catch (error) {
      console.log("Failed to add address.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <TextInput
          placeholder="Full Name (Required)*"
          placeholderTextColor="#bfbfbf"
          style={styles.inputField}
          value={state.fullName}
          onChangeText={(value) => handleChange("fullName", value)}
        />
        <TextInput
          placeholder="Phone Number (Required)*"
          placeholderTextColor="#bfbfbf"
          style={styles.inputField}
          value={state.phoneNo}
          onChangeText={(value) => handleChange("phoneNo", value)}
        />
        <TextInput
          placeholder="Pincode (Required)*"
          placeholderTextColor="#bfbfbf"
          style={styles.inputField}
          value={state.pincode}
          onChangeText={(value) => handleChange("pincode", value)}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="City (Required)*"
            placeholderTextColor="#bfbfbf"
            style={[styles.inputField, { width: "49%" }]}
            value={state.city}
            onChangeText={(value) => handleChange("city", value)}
          />
          <TextInput
            placeholder="State (Required)*"
            placeholderTextColor="#bfbfbf"
            style={[styles.inputField, { width: "49%" }]}
            value={state.sTATE}
            onChangeText={(value) => handleChange("sTATE", value)}
          />
        </View>

        <TextInput
          placeholder="House No., Building Name (Required)*"
          placeholderTextColor="#bfbfbf"
          style={styles.inputField}
          value={state.building}
          onChangeText={(value) => handleChange("building", value)}
        />
        <TextInput
          placeholder="Road Name, Area, Colony (Required)*"
          placeholderTextColor="#bfbfbf"
          style={styles.inputField}
          value={state.road}
          onChangeText={(value) => handleChange("road", value)}
        />

        <TouchableOpacity style={styles.btn} onPress={savedData}>
          <Text style={styles.btnText}>Save Address</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#48426d",
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    marginVertical: 10,
    backgroundColor: "#312c51",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#f0c38e",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: "#48426d",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
});
