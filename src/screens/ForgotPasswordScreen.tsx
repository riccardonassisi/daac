import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("")

  const navigation = useNavigation()

  const onConfirmPressed = () => {
    navigation.navigate("ResetPassword")
  }
  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }


  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Reimposta la password</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={true}
        />

        <CustomButton
          buttonText="Conferma"
          onPress={onConfirmPressed}
        />

        <CustomButton
          buttonText="Torna alla pagina di accesso"
          onPress={onSignInPressed}
          type="TEXTONLY"
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.mainPurple,
    padding: 10
  }
})

export default ForgotPasswordScreen
