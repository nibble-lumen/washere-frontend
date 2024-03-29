import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CloseButton from '../CloseButton';

const Heading = ({ title, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <CloseButton onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Heading;
