import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../../config/colors";
import ProfilePhoto from "../ProfilePhoto";

const Person = ({ data }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => console.log("PRESSED PERSON")}>
        <ProfilePhoto photoKey={data.profile_photo} size={60} />
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{data.fullname}</Text>
          <Text style={styles.personPlace}>@{data.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  personInfo: {
    flexDirection: "column",
  },
  personName: {
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  personPlace: {
    color: colors.mediumlight,
  },
});

export default Person;
