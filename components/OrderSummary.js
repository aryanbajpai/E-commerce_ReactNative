import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderSummary({ navigation }) {
    const handleAddress = async() => {
        navigation.navigate('Add Address')
    };

    useEffect(() => {});

    return(
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.addressContainer}>
                    <Text style={{color: 'white', fontSize: 19, fontWeight: 500}}>Deliver to: </Text>

                    <TouchableOpacity style={styles.addressBtn} onPress={handleAddress}>
                        <Text style={styles.addressBtnText}>Add address</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#48426d",
    },
    topic: {
      fontSize: 25,
      fontWeight: "bold",
      marginVertical: 10,
      color: "#fff",
    },
    addressContainer:{
        backgroundColor: '#312c51',
        marginVertical: 10,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressBtn: {
        backgroundColor: '#f0c38e',
        padding: 7,
        borderRadius: 10,
    },
     addressBtnText: {
        color: '#48426d',
        fontWeight: 'bold',
        fontSize: 16,
     }
  });