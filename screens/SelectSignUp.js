import React from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function SelectSignUp({ navigation }) {

    const signProf = () => {
        navigation.navigate("Cadastro de Professores")
    }

    const signInst = () => {
        navigation.navigate("Cadastro de Instituições");
    }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signProf} style={styles.button} >
        <Text style={styles.buttonText}>Professor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signInst} style={styles.button} >
        <Text style={styles.buttonText}>Instituição</Text>
      </TouchableOpacity>
    </View>
  ); //
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#750ce1",
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }


});
