import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../src/firebase/config";


export default function Escolas() {

  const [inst, setInst] = useState([]);

  const fetchPeople = async () => {
    await getDocs(collection(db, "instituicoes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setInst(newData);
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
      {inst.map((inst) => (
          <TouchableOpacity key={inst["useruid"]}>
            <View style={styles.informacoesProfessor}>
              <Image
                source={{
                  uri: inst["profile"] ? inst["profile"] :"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{inst["nome"]}</Text>
                <Text style={styles.headline}>{inst["setor"]}</Text>
                <Text style={styles.headline}>{inst["telefone"]}</Text>
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
    textAlign: "justify",
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
