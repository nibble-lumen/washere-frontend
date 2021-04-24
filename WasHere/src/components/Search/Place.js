import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import colors from "../../config/colors";

const Place = ({ data }) => {
  console.log("DATA", data);
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("PRESSED PLACE");
        }}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{data.name}</Text>
          <Text style={styles.placeAddress}>{data.address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  placeInfo: {
    flexDirection: "column",
  },
  placeName: {
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  placeAddress: {
    color: colors.mediumlight,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
  },
});

export default Place;