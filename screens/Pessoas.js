import { auth, db } from "../src/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  localStorage,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Linking,
  TextInput,
} from "react-native";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function Pessoas() {
  const [professores, setProfessores] = useState([]);

  const fetchPeople = async () => {
    await getDocs(collection(db, "professores")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProfessores(newData);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPeople();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ScrollView>
        {professores.map((professor) => (
          <TouchableOpacity key={professor["useruid"]}>
            <View style={styles.informacoesProfessor}>
              <Image
                source={{
                  uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{professor["nome"]}</Text>
                <Text style={styles.headline}>{professor["formacao"]}</Text>
                <Text style={styles.headline}>{professor["telefone"]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  informacoesProfessor: {
    flexDirection: "row",
    alignItems: "center",
    padding: 37,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 80,
    textAlign: "auto",
  },
  headline: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    marginRight: 80,
  },
  containerTelHome: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  containerCarregamento: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  textoInformativo: {
    textAlign: "center",
    fontSize: 30,
  },
  button: {
    height: 30,
  },
});
