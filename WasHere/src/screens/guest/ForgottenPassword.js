import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import WelcomeScreenGreen from "../../assets/images/welcome-green.svg";
import BottomSheet from "../../components/BottomSheet";
import { Form, FormField, Heading, SubmitButton } from "../../components/form";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import { requestResetCode, cancelPasswordReset } from "../../store/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("You need to enter a valid email!").required("This field is required!"),
});

const ResetForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, resetCodeSent } = useSelector((state) => state.auth);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (resetCodeSent) {
      navigation.navigate(routes.RESET_CODE_FORM);
    }
  }, [resetCodeSent]);

  const handleSubmit = (values) => {
    dispatch(requestResetCode(values.email));
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>WasHere</Text>
      <WelcomeScreenGreen style={styles.image} />
      <BottomSheet
        onClose={() => navigation.goBack()}
        bottomSheetRef={bottomSheetRef}
        adjustToContentHeight
        childrenStyle={styles.content}
        openOnLoad={true}>
        <View style={styles.sheet}>
          <Heading
            title="Forgot password"
            onClose={() => {
              dispatch(cancelPasswordReset());
              navigation.goBack();
            }}
          />
          <Text style={styles.helperText}>
            Please provide your e-mail address to request a password reset code. You will receive your code to your e-mail address if it is
            valid.
          </Text>
          <Form initialValues={{ email: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="mail-outline"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <SubmitButton title="Request code" loading={loading} />
          </Form>
        </View>
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: "flex-start",
    paddingTop: hp("4%"),
  },
  sheet: {
    paddingVertical: 15,
  },
  helperText: {
    textAlign: "justify",
    marginBottom: 10,
  },
  title: {
    fontFamily: "BalooBhai2-Medium",
    fontSize: 42,
    textAlign: "center",
    color: colors.white,
  },
  image: {
    marginBottom: 20,
    alignSelf: "center",
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
});

export default ResetForm;
