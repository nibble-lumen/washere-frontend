import React from "react";
import { ActivityIndicator } from "react-native";
import { useFormikContext } from "formik";

import AppButton from "../Button";

import colors from "../../config/colors";

const SubmitButton = ({ title, loading, customStyle }) => {
  const { handleSubmit } = useFormikContext();

  return loading ? (
    <ActivityIndicator style={{ marginTop: 10 }} size="large" color={colors.primary} />
  ) : (
    <AppButton title={title} onPress={handleSubmit} customStyle={customStyle} />
  );
};

export default SubmitButton;
