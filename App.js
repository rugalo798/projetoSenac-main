import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Inicial from "./Inicial";
import SignUp from "./screens/SignUp";
import { auth } from "./src/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import SelectSignUp from "./screens/SelectSignUp";
import SignUpInst from "./screens/SignUpInst";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.providerId);
      } else {
        setUser("");
      }
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name="Inicial">
            {(props) => <Inicial {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen name="Cadastro de Professores" component={SignUp} />
            <Stack.Screen
              name="Cadastro de Instituições"
              component={SignUpInst}
            />
            <Stack.Screen
              name="Escolha o tipo de cadastro"
              component={SelectSignUp}
            />
            <Stack.Screen options={{ headerShown: false }} name="Inicial">
              {(props) => <Inicial {...props} extraData={user} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
Coisas pra fazer:
# Endereço com o CEP
# campo Obrigatório
# Mudar feedback para Configurações, fazer aba de lado dizendo sobre feedback e modo claro/escuro
# Data
# Adicionar faculdade
# Opção de colocar currículo
# Adicionar fotos
# Acessibilidade

Faculdades:

Universidade Federal de Alagoas (UFAL)
Endereço: Av. Lourival Melo Mota, Tabuleiro do Martins, Maceió - AL
Telefone:  (82) 3214-1461

Centro Universitário CESMAC
Endereço: Farol, Maceió-AL
Telefone: (82) 3215-5000

UNINASSAU
Endereço: Rua José de Alencar, S/N, Farol
Endereço: Rua Prof. Sandoval Arroxelas, 239, Ponta Verde, Maceió - AL
Telefone: (82)3036-2299

Faculdade Delmiro Gouveia
Endere: R. Roberto Símonsen, Farol, Maceió - AL
tel: (82) 3346-1600

SEUNE
Ende: Av. Dom Antônio Brandão, Farol, Maceió - AL
Tel: (82) 3215-2900
*/