import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyProfileScreen from "../../screens/user/MyProfile";
import { navigatorOptions, stackScreenOptions } from "./navigatorSettings";
import Settings from "../../screens/user/Settings";

const MyProfileStack = createStackNavigator();

const MyProfile = () => {
  return (
    <MyProfileStack.Navigator screenOptions={navigatorOptions}>
      <MyProfileStack.Screen name="MyProfile" component={MyProfileScreen} options={{ ...stackScreenOptions, title: "My Profile" }} />
      <MyProfileStack.Screen name="Settings" component={Settings} options={{ ...stackScreenOptions, title: "Settings" }} />
    </MyProfileStack.Navigator>
  );
};

export default MyProfile;
