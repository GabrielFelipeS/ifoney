import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { loggedIn, useUsers } from "./_layout";

export default function Login() {
  const { user, login } = loggedIn();
  const { users, addUser } = useUsers();

  const router = useRouter();
  const [cxLogin, setCxLogin] = useState('');
  const [cxSenha, setCxSenha] = useState('');

  const logar = () => {

    const isCorrect = users.find(user => {
      const isCorrect = cxLogin.trim() === user.email && cxSenha.trim() === user.password
      
      if(isCorrect) login(user)

      return isCorrect 
    })

    if(true) {
      router.push("/splash?url=home")
    } else {
      alert('Nome ou senha incorretos')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/name_logo.png')} style={styles.title} ></Image>
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Digite o seu email" 
          onChangeText={setCxLogin} 
          value={cxLogin} 
        />

        <TextInput 
          style={styles.input}
          placeholder="Digite a senha" 
          onChangeText={setCxSenha} 
          secureTextEntry={true}
          value={cxSenha} 
        />

        <TouchableOpacity onPress={logar}>
          <LinearGradient
            colors={['#a8eb12', '#00bf72', '#003A52']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
            style={styles.button}
          >

            <Text style={styles.text}>Clique Aqui</Text>
            
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '80%'
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    rowGap: 15,
    width: '100%'
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
  input: {
    height: 50,
    width: '100%',
    borderColor: '#af8',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 25 
  }
});