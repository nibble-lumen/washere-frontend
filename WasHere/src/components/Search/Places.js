import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import Place from "./Place";
import { changeTabRoute } from "../../store/search";

import colors from "../../config/colors";

const Places = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.search.places);

  const { name } = useRoute();

  useFocusEffect(() => {
    dispatch(changeTabRoute(name));
  });

  return (
    <View style={styles.container}>
      {places.length !== 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.reference}
          renderItem={({ item }) => <Place data={item} navigation={navigation} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Places;
