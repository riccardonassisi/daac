import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/forms/CustomButton"
import CustomInput from "../components/forms/CustomInput"

import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"

const ConfirmEmailScreen = () => {
  const [email, setEmail] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")

  const navigation = useNavigation()

  const onConfirmPressed = async() => {
    try {
      await Auth.confirmSignUp(username, code)
    } catch (error) {
      console.log("error confirming sign up", error)
    }

    navigation.navigate("Home")
  }
  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }
  const onResendPress = () => {
    console.warn("RESEND CODE")
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Conferma la tua email</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Codice di conferma"
          value={confirmationCode}
          setValue={setConfirmationCode}
          secureTextEntry={false}
        />

        <CustomButton
          buttonText="Conferma"
          onPress={onConfirmPressed}
        />
        <CustomButton
          buttonText="Spedisci nuovamente il codice"
          onPress={onResendPress}
          type="SECONDARY"
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
    padding: 10,
    textAlign: "center"
  }
})

export default ConfirmEmailScreen
