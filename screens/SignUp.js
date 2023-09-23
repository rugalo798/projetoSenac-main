import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../src/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState("");
  const [numero, setNumero] = useState("");
  const [formacao, setFormacao] = useState("");

  const createUser = () => {
    if (senha != confSenha) {
      alert("Suas senhas não são a mesma");
    } else if (senha.length < 6) {
      alert("Sua senha não é segura, tem que ter pelo menos 6 digitos");
    } else {
      createUserWithEmailAndPassword(auth, email, senha)
        .then((registredUser) => {
          const professor = {
            useruid: registredUser.user.uid,
            nome: nome,
            formacao: formacao,
            date: data,
            cpf: cpf,
            telefone: numero,
          };

          setDoc(doc(db, "professores", registredUser.user.uid), professor)
            .then((result) => {
              console.log(result);
              navigation.navigate("Inicial");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyview}>
      <View style={styles.container}>
        <TextInput
          value={nome}
          onChangeText={(text) => setNome(text)}
          placeholder="Nome"
          style={styles.input}
        />
        <TextInput
          value={formacao}
          onChangeText={(e) => setFormacao(e)}
          placeholder="Formação"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          style={styles.input}
        />
        <TextInput
          value={data}
          onChangeText={(e) => setData(e)}
          placeholder="Data de Nascimento"
          style={styles.input}
        />
        <TextInput
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          placeholder="CPF"
          style={styles.input}
        />
        <TextInput
          value={numero}
          onChangeText={(text) => setNumero(text)}
          placeholder="Telefone"
          style={styles.input}
        />
        <TextInput
          value={senha}
          onChangeText={(e) => setSenha(e)}
          secureTextEntry={true}
          placeholder="Senha"
          style={styles.input}
        />
        <TextInput
          value={confSenha}
          onChangeText={(e) => setConfSenha(e)}
          secureTextEntry={true}
          placeholder="Confirme sua Senha"
          style={styles.input}
        />

        <TouchableOpacity onPress={createUser} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

// Professor:
// Nome
// Formação
// Data de Nascimento
// CPF
// E-mail
// Curriculo
// Numero

// Escolas:
// Nome
// Numero
// CNPJ
// Endereço
// Razão social

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("window").height / 8,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15,
  },

  input: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#750ce1",
    marginTop: 10,
    padding: 10,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#750ce1",
    height: 35,
    width: "50%",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
  },
});
