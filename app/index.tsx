import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const toLogin = () => {
    console.log('login')
   router.push("/login")
  }

  const toRegister = () => {
    router.push("/register")
  }

  return (
    <View style={styles.container}>
     <View style={styles.titleContainer}>
      <Image source={require('../assets/images/name_logo.png')} style={styles.title} ></Image>
      <Image source={require('../assets/images/image.png')} style={styles.image} ></Image>
      <View>
        <Text style={styles.paragraph}>Ainda não esta organizando seus gastos?</Text>
        <Pressable onPress={() => toRegister()} >
          <LinearGradient style={styles.spanContainer}
            colors={['#a8eb12', '#00bf72', '#00bf72', '#a8eb12']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
          >
            <Text  style={styles.span}>Organize já</Text> 
          </LinearGradient> 
        </Pressable>
      </View>
     </View>
      
      <View style={styles.options}>
        <Pressable onPress={() => toLogin()} >
          <LinearGradient style={styles.login}
            colors={['#a8eb12', '#00bf72', '#003A52']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
          >
            <Text style={styles.text}>Login</Text>
          </LinearGradient>
        </Pressable>

        <Pressable onPress={() => toRegister()} >
          <LinearGradient style={styles.register}
            colors={['#a8eb12', '#00bf72', '#003A52']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
          >
            <Text style={styles.text}>Register</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  spanContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  span: {
    color: '#F1F3F6',
    width: 90,

    padding: 7,
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paragraph: {
    color: 'black',
    fontSize: 16, 
  },
  text: {
    color: '#F1F3F6',
    fontSize: 16, 
  },
  options: {
    display: "flex",
    justifyContent: 'space-around',  
    alignItems: 'center', 
    gap: 10,
    width: '100%',
    padding: 20,  
  }, 
  login: {
    backgroundColor: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(127,192,20,1) 35%, rgba(0,212,255,1) 100%)',
    width: 250,
    height: 50,
    justifyContent: 'center',  
    alignItems: 'center',  
    borderRadius: 10, 
  },
  register: {
    backgroundColor: 'blue',
    width: 250,
    height: 50,
    justifyContent: 'center',  
    alignItems: 'center', 
    borderRadius: 10,
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 25 
  }
});