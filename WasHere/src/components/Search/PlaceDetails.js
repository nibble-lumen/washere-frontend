import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { fetchPlacePhoto, setEmptyPlacePhoto } from "../../store/place";
import MapSection from "../Post/MapSection";
import Text from "../../components/Text";
import Screen from "../../components/Screen";

import colors from "../../config/colors";

const PlaceDetails = ({ route, navigation }) => {
  const { placeName } = route.params;

  const { place, photoURL } = useSelector((state) => state.place);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: placeName });
  }, []);

  useEffect(() => {
    if (Object.keys(place).length != 0 && place.photos) {
      dispatch(fetchPlacePhoto(place.photos[0].photo_reference));
    } else {
      dispatch(setEmptyPlacePhoto());
    }
  }, [place]);

  return (
    <>
      <Screen style={styles.container}>
        <View style={{ marginBottom: 12 }}>
          {photoURL && (
            <View style={styles.basicInformation}>
              <Image style={styles.placeImage} source={{ uri: photoURL }} />
            </View>
          )}

          <BlankSpacer height={8} />

          {(place.international_phone_number || place.website) && (
            <>
              <Text style={[{ color: colors.mediumlight }, styles.text]}>Contact</Text>
              <BlankSpacer height={8} />
              <View>
                {place.international_phone_number && (
                  <View style={styles.contact}>
                    <Icon style={styles.contactIcon} name="call-outline" size={28} />
                    <Text style={styles.text}>{place.international_phone_number}</Text>
                  </View>
                )}

                {place.website && (
                  <View style={styles.contact}>
                    <Icon style={styles.contactIcon} name="globe-outline" size={28} />
                    <Text style={styles.text}>{place.website}</Text>
                  </View>
                )}
              </View>
            </>
          )}

          <View style={styles.divider} />
          <View style={styles.locationInfoContainer}>
            <Text style={styles.locationInformation}>Location: </Text>
            <Text style={styles.locationInformation}>{place.formatted_address}</Text>
          </View>
          {place.geometry && (
            <MapSection style={styles.map} latitude={place.geometry.location.lat} longitude={place.geometry.location.lng} />
          )}
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 14,
  },
  map: { borderRadius: 15 },
  placeImage: {
    borderRadius: 60,
    height: 120,
    width: 120,
    marginRight: 10,
  },
  basicInformation: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  contactIcon: {
    marginRight: 5,
  },
  locationInfoContainer: {
    marginVertical: 5,
  },
  locationInformation: {
    color: colors.mediumlight,
    fontSize: 14,
  },
  divider: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 2,
  },
  placeName: {
    fontSize: 30,
    color: colors.mediumlight,
    fontWeight: "200",
    marginBottom: 5,
  },
});

export default PlaceDetails;
