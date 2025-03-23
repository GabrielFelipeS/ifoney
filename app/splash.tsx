import { View, StyleSheet, ActivityIndicator , Image, Alert } from "react-native";
import React from "react";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  const { url } = useLocalSearchParams();

  async function prepare() {
    try {
      //await aguarde a promise tempo função
      await new Promise(tempo => setTimeout(tempo, 3500));
    } catch (e) {
       Alert.alert(e);
    } finally {
      const redirectUrl = `/${url}` as RelativePathString
      router.push(redirectUrl);
    }
  }

  prepare();
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/name_logo.png')} style={styles.title} ></Image>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },  
  title: {
    width: 150,
    height: 30
  },
});