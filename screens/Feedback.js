import { View, Text, StyleSheet } from "react-native";

export default function Feedback() {
    return (
        <View style={styles.container} >
            <Text style={styles.message} >Feedback</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
  
    message: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });