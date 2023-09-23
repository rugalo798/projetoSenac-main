import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { auth, db, storage } from "../src/firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
/* import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs(); */

export default function Home({ navigation }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [profile, setProfile] = useState("");
  const [formacao, setFormacao] = useState("");
  const [nomeInst, setNomeInst] = useState("");
  const [razao, setRazao] = useState("");
  const [setor, setSetor] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [uidInst, setUidInst] = useState("");
  const [uid, setUid] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageProf, setProfileImageProf] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            const docSnap = await getDoc(doc(db, "professores", user.uid));

            if (docSnap.exists() == true) {
              setNome(docSnap.data()["nome"]);
              setUid(docSnap.data()["useruid"]);
              setData(docSnap.data()["date"]);
              setCPF(docSnap.data()["cpf"]);
              setTelefone(docSnap.data()["telefone"]);
              setFormacao(docSnap.data()["formacao"]);
              setProfileImageProf(docSnap.data()["profile"]);
            } else {
              const instituicoes = await getDoc(
                doc(db, "instituicoes", user.uid)
              );
              setNomeInst(instituicoes.data()["nome"]);
              setUidInst(instituicoes.data()["useruid"]);
              setSetor(instituicoes.data()["setor"]);
              setCNPJ(instituicoes.data()["cnpj"]);
              setTelefone(instituicoes.data()["telefone"]);
              setRazao(instituicoes.data()["razao"]);
              setCEP(instituicoes.data()["cep"]);
              setEndereco(instituicoes.data()["endereco"]);
              setProfileImage(instituicoes.data()["profile"]);
            }
          } else {
          }
        },
        100
      );
      return () => clearTimeout(timer);
    });
  }, []);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(result.assets[0].uri);
      uploadImage();
    } else {
      alert("Você não selecionou a foto");
    }
  };

  const uploadImage = async () => {
    if (uid != "") {
      const refImage = ref(storage, uid + "." + profile.split(".").pop());
      const url = await getDownloadURL(refImage);
      console.log(url);

      const img = await fetch(profile);
      const bytes = await img.blob();

      await uploadBytes(refImage, bytes, {
        contentType: "image/jpeg",
      })
        .then((result) => {
          updateDoc(doc(db, "professores", uid), {
            profile: url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (uidInst != "") {
      const refImage = ref(storage, uidInst + "." + profile.split(".").pop());

      const img = await fetch(profile);
      const bytes = await img.blob();
      const url = await getDownloadURL(refImage);
      console.log(url);

      await uploadBytes(refImage, bytes, {
        contentType: "image/jpeg",
      })
        .then((result) => {
          console.log("sucesso");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setRazao("");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageAsync}>
        <Image style={styles.profilePhoto} source={{ uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png" }} />
      </TouchableOpacity>
      <Text style={styles.message}>Nome: {razao ? nomeInst : nome}</Text>
      <Text style={styles.message}>
        {razao ? "Razão" : "Formação"}: {razao ? razao : formacao}
      </Text>
      <Text style={styles.message}>
        {razao ? "Setor: " : "Data de Nascimento: "} {razao ? setor : data}
      </Text>
      <Text style={styles.message}>
        {razao ? "CNPJ: " : "CPF: "} {razao ? cnpj : cpf}
      </Text>
      <Text style={styles.message}>Telefone: {telefone}</Text>
      {razao ? <Text style={styles.message}>CEP: {cep}</Text> : <></>}
      {razao ? <Text style={styles.message}>Endereço: {endereco}</Text> : <></>}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  profilePhoto: {
    height: 140,
    width: 150,
    borderRadius: 100,
  },

  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },

  logoutButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 10,
    backgroundColor: "#DC4C64",
    borderWidth: 1,
    width: "50%",
    height: 50,
    borderColor: "#fff",
    borderRadius: 8,
  },

  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
