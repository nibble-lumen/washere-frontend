import React from "react";
import { StyleSheet, Image } from "react-native";

const ConnectionSimple = ({ data }) => {
  return <Image style={styles.userImage} source={{ uri: data.user.photoURL }} />;
};

const styles = StyleSheet.create({
  userImage: {
    borderRadius: 50,
    height: 45,
    width: 45,
    marginRight: 15,
  },
});

export default ConnectionSimple;
