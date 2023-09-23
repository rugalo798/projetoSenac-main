import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../src/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";

// Escolas:
// Nome
// Numero
// CNPJ
// Endereço
// Razão social

export default function SignUpInst({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [numero, setNumero] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [razao, setRazao] = useState("");
  const [setor, setSetor] = useState("");

  const createInst = () => {
    if (senha != confSenha) {
      alert("Suas senhas não são a mesma");
    } else if (senha.length < 6) {
      alert("Sua senha não é segura, tem que ter pelo menos 6 digitos");
    } else {
      createUserWithEmailAndPassword(auth, email, senha)
        .then((registredUser) => {
          const inst = {
            useruid: registredUser.user.uid,
            nome: nome,
            cnpj: cnpj,
            cep: cep,
            endereco: endereco,
            razao: razao,
            telefone: numero,
            setor: setor,
          };

          setDoc(doc(db, "instituicoes", registredUser.user.uid), inst)
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

  const consultarCep = (cep) => {
    if (cep.length >= 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`, {
          method: "GET",
        })
        .then((response) => {
          setEndereco(response.data["logradouro"]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if(cep.length < 8) {
      setEndereco("")
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      consultarCep(cep);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cep]);

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
          value={setor}
          onChangeText={(text) => setSetor(text)}
          placeholder="Setor / Nome do Departamento"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          style={styles.input}
        />
        <TextInput
          value={cnpj}
          onChangeText={(e) => setCNPJ(e)}
          placeholder="CNPJ"
          style={styles.input}
        />

        <TextInput
          value={cep}
          onChangeText={(text) => setCEP(text)}
          placeholder="CEP"
          style={styles.input}
        />
        <TextInput
          value={endereco}
          onChangeText={(text) => {
            if (cep.length < 8) {
              setEndereco("");
            } else {
              setEndereco(text);
            }
          }}
          placeholder="Endereço"
          style={styles.input}
        />
        <TextInput
          value={numero}
          onChangeText={(e) => setNumero(e)}
          placeholder="Telefone"
          style={styles.input}
        />
        <TextInput
          value={razao}
          onChangeText={(e) => setRazao(e)}
          placeholder="Razão Social"
          style={styles.input}
        />
        <TextInput
          value={senha}
          onChangeText={(text) => setSenha(text)}
          placeholder="Senha"
          style={styles.input}
        />
        <TextInput
          value={confSenha}
          onChangeText={(text) => setConfSenha(text)}
          placeholder="Confirme sua senha"
          style={styles.input}
        />

        <TouchableOpacity onPress={createInst} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("window").height / 8,
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
    marginBottom: Dimensions.get("window").height / 10,
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
