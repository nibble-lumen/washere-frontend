import React, { useRef, useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-map-clustering";
import Geolocation from "@react-native-community/geolocation";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import PostMarker from "../../components/PostMarker";
import Slider from "../../components/Slider";

import { API } from "../../config/config.json";
import colors from "../../config/colors";

const Map = ({ navigation }) => {
  const mapRef = useRef();
  const socket = useRef();
  const [initialRegion, setInitialRegion] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.auth.token);

  // Keeps track of the region the user is viewing on the map and time range he has selected
  const [postsQuery, setPostsQuery] = useState({
    locationFrom: {
      latitude: 0,
      longitude: 0,
    },
    locationTo: {
      latitude: 0,
      longitude: 0,
    },
    time: {
      from: 0,
      to: 0,
    },
  });

  useEffect(() => {
    // Navigate to the current location on map
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setInitialRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        });
      },
      (error) => console.log(error),
    );

    // Connect to the websocket server
    socket.current = io(API, {
      auth: {
        token,
      },
    });
    socket.current.on("posts", (posts) => setPosts(posts));
    socket.current.on("new post", (post) => setPosts((old) => [...old, post]));

    return () => socket.current.close();
  }, [token]);

  // When post query changes, fetch new posts for that query
  useEffect(() => socket.current.emit("fetch near me", postsQuery), [postsQuery]);

  // Updates posts query when time range is changed
  const handleTimeRangeChange = useCallback((from, to) => {
    setPostsQuery((old) => ({ ...old, time: { from, to } }));
  }, []);

  const handleOpenPost = (post) => {
    navigation.navigate("PostDetails", { postId: post.id });
  };

  // Updates post query when map region is changed
  const handleRegionChange = ({ latitude, latitudeDelta, longitude, longitudeDelta }) => {
    const locationFrom = {
      latitude: latitude - latitudeDelta,
      longitude: longitude + longitudeDelta,
    };

    const locationTo = {
      latitude: latitude + latitudeDelta,
      longitude: longitude - latitudeDelta,
    };
    setPostsQuery((old) => ({ ...old, locationFrom, locationTo }));
  };

  return (
    <View style={styles.screen}>
      {initialRegion && (
        <MapView
          style={styles.map}
          ref={mapRef}
          clusterColor={colors.primary}
          initialRegion={initialRegion}
          onRegionChangeComplete={handleRegionChange}>
          {posts.map((post) => (
            <PostMarker
              key={post.id}
              coordinate={{
                latitude: parseFloat(post.latitude),
                longitude: parseFloat(post.longitude),
              }}
              post={post}
              onPress={() => handleOpenPost(post)}
            />
          ))}
        </MapView>
      )}
      <View style={styles.sliderContainer}>
        <Slider handleValueChange={handleTimeRangeChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sliderContainer: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
});

export default Map;
