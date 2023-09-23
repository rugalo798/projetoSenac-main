import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { auth, provider } from "../src/firebase/config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        navigation.navigate("Inicial");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signProfe = () => {
    navigation.navigate("Escolha o tipo de cadastro");
  };

  return (
    <View style={styles.container}>

      <Image style={styles.icone} source={require("../assets/icone.png")} />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        value={senha}
        style={styles.input}
        onChangeText={(text) => setSenha(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.underText}>ou</Text>

      <TouchableOpacity style={styles.buttonSignUp} onPress={signProfe}>
        <Text style={styles.buttonTextSignUp}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#750ce1",
    height: 35,
    width: "50%",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
  },

  buttonSignUp: {
    height: 35,
    width: "50%",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "black"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTextSignUp: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#750ce1"
  },

  input: {
    height: 40,
    width: "70%",
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: "#808080",
    marginTop: 10,
    padding: 10,
    fontWeight: "500",
  },

  socialButton: {
    height: 40,
    width: 40,
    marginTop: 30,
  },

  underText: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15
  },

  icone: {
    width: 250,
    height: 150,
    maxWidth: 250,
    maxHeight: 150,
  }
});
