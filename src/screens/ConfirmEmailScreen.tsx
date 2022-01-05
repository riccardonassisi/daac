import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/forms/CustomButton"
import CustomInput from "../components/forms/CustomInput"
import CustomErrorMessage from "../components/forms/CustomErrorMessage"

import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"
import { Auth } from "aws-amplify"

const ConfirmEmailScreen = () => {
  const [username, setUsername] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigation = useNavigation()

  const onConfirmPressed = async() => {
    try {
      await Auth.confirmSignUp(username, confirmationCode)
    } catch (error) {
      setErrorMessage(error.message)
    }

    navigation.navigate("SignIn")
  }
  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }
  const onResendPress = async() => {
    try {
      await Auth.resendSignUp(username)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Conferma la tua email</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Codice di conferma"
          value={confirmationCode}
          setValue={setConfirmationCode}
          secureTextEntry={false}
        />

        <CustomErrorMessage value={errorMessage}/>

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
