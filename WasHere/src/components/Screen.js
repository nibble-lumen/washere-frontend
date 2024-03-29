import React from "react";
import { StyleSheet, View } from "react-native";

const Screen = ({ children, style }) => {
  return (
    <View style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
