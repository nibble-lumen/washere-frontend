import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FeedList from "../FeedList";
import Screen from "../Screen";
import { getFeedByTag } from "../../store/search";

import colors from "../../config/colors";

const TagFeed = ({ route }) => {
  const { tagFeed, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { tag } = route.params;

  useEffect(() => {
    dispatch(getFeedByTag(tag));
  }, []);

  return (
    <Screen style={styles.container}>
      <FeedList items={tagFeed.posts} onRefresh={() => dispatch(getFeedByTag(tag))} refreshing={loading} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -8,
    marginBottom: 10,
  },
  backButtonText: { color: colors.primary, fontSize: 17 },
  icon: {
    color: colors.primary,
  },
});

export default TagFeed;
