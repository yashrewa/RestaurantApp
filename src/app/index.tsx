import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Text style={style.header}>Welcome to Adarsh Egg Center</Text>
      <Link href={'/signIn'} asChild>
        <Button text="Signin" />
      </Link>
      <Link href={'/signUp'} asChild>
        <Button text="Signup" />
      </Link>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 30,
    color: Colors.light.text
  }
})

export default index;