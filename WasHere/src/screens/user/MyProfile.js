import React, { useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from "react-native";
import BlankSpacer from "react-native-blank-spacer";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Text from "../../components/Text";
import Screen from "../../components/Screen";
import EditProfile from "../../components/Profile/EditProfile";
import MyConnections from "../../components/Profile/MyConnections";
import BottomSheet from "../../components/BottomSheet";
import ConnectionSimple from "../../components/Profile/ConnectionSimple";
import { fetchMyProfile, fetchMyConnections } from "../../store/user";
import Post from "../../components/Post";
import ProfilePhoto from "../../components/ProfilePhoto";
import SettingsButton from "../../components/SettingsButton";
import EditProfileButton from "../../components/EditProfileButton";
import { getPosts } from "../../store/posts";

import colors from "../../config/colors";
import TelegramIcon from "../../assets/images/telegram.svg";
import FacebookMessengerIcon from "../../assets/images/fb-messenger.svg";

const MyProfile = ({ navigation }) => {
  const editProfileRef = useRef(null);
  const myConnectionsRef = useRef(null);

  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.user.myProfile);
  const loading = useSelector((state) => state.user.loading);
  const myConnections = useSelector((state) => state.user.myConnections);
  const posts = useSelector((state) => state.posts.user.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchMyProfile());
    dispatch(fetchMyConnections());
    dispatch(getPosts(userId));
  }, [userId]);

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => <EditProfileButton onOpenEditProfile={onOpenEditProfile} />, headerRight: SettingsButton });
  }, []);

  const onOpenEditProfile = () => {
    editProfileRef.current.open();
  };

  const onOpenMyConnections = () => {
    myConnectionsRef.current.open();
  };

  return (
    <>
      <Screen style={styles.container}>
        <FlatList
          data={posts}
          ListHeaderComponent={
            <View style={styles.userSection}>
              <View style={styles.basicInformation}>
                <ProfilePhoto photoKey={user.profile_photo} size={100} />
                <View style={styles.textInformation}>
                  <Text style={styles.username}>@{user.username}</Text>
                  <View style={styles.aboutContainer}>
                    <Text style={styles.text}>{user.about}</Text>
                  </View>
                </View>
              </View>

              <BlankSpacer height={8} />
              <Text style={[{ color: colors.mediumlight }, styles.text]}>Contact me</Text>
              <BlankSpacer height={8} />
              <View style={styles.socials}>
                <View style={styles.socialMediaPlatform}>
                  <TelegramIcon style={styles.socialMediaIcon} />
                  <Text style={styles.text}>{user.contact_telegram}</Text>
                </View>

                <View style={styles.socialMediaPlatform}>
                  <FacebookMessengerIcon style={styles.socialMediaIcon} />
                  <Text style={styles.text}>{user.contact_messenger}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={[{ color: colors.mediumlight, marginTop: 10 }, styles.text]}>My connections ({myConnections.length})</Text>

              <View style={styles.connections}>
                <FlatList
                  style={styles.connectionsList}
                  horizontal={true}
                  data={myConnections}
                  renderItem={({ item }) => <ConnectionSimple data={item} />}
                />
                <TouchableOpacity style={styles.moreConnectionsContainer} onPress={onOpenMyConnections}>
                  <Text style={styles.moreConnections}>{myConnections.length > 4 ? `${myConnections.length - 4} more` : "View more"}</Text>
                  <Icon name="chevron-forward-outline" color={colors.primary} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
            </View>
          }
          renderItem={({ item }) => <Post data={item} />}
        />
      </Screen>
      <BottomSheet
        bottomSheetRef={editProfileRef}
        modalHeight={hp("75%")}
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior="padding"
        overlayStyle={{
          borderRadius: 15,
        }}>
        <EditProfile editProfileRef={editProfileRef} />
      </BottomSheet>
      <BottomSheet
        bottomSheetRef={myConnectionsRef}
        modalHeight={hp("60%")}
        keyboardAvoidingBehavior="padding"
        modalStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        customRenderer={() => (
          <Animated.View>
            <MyConnections myConnectionsRef={myConnectionsRef} />
          </Animated.View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  userSection: {
    marginVertical: 20,
  },
  text: {
    fontSize: 15,
  },
  basicInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInformation: {
    flex: 2,
    flexDirection: "column",
  },
  aboutContainer: {
    backgroundColor: "#FAFAFAFA",
    padding: 15,
    borderRadius: 15,
  },
  socials: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 15,
  },
  socialMediaPlatform: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  divider: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 2,
  },
  connections: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  moreConnectionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreConnections: {
    color: "#39C555",
    fontSize: 15,
  },
  connectionsList: {
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: colors.mediumlight,
    fontWeight: "200",
    marginBottom: 5,
  },
});

export default MyProfile;
