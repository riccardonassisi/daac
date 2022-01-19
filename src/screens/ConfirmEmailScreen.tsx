import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/forms/CustomButton"
import CustomInput from "../components/forms/CustomInput"
import CustomErrorMessage from "../components/forms/CustomErrorMessage"

import Colors from "../constants/Color"

import { useNavigation, useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import useColorScheme from "src/hooks/useColorScheme"
import { useLoader } from "src/loader/loader.context"

const ConfirmEmailScreen = () => {

  const route = useRoute()
  const navigation = useNavigation()
  const loader = useLoader()
  const colorScheme = useColorScheme()

  const [username, setUsername] = useState(route?.params?.username)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onConfirmPressed = async() => {
    loader.setLoaderVisible(true)
    try {
      const res = await Auth.confirmSignUp(username, confirmationCode)
      loader.dismissLoader()
      navigation.navigate("SignIn")
    } catch (error) {
      setErrorMessage(error.message)
      loader.dismissLoader()
    }

  }

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  const onResendPress = async() => {
    loader.setLoaderVisible(true)
    try {
      await Auth.resendSignUp(username)
      loader.dismissLoader()
    } catch (error) {
      setErrorMessage(error.message)
      loader.dismissLoader()
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles[`${colorScheme}_title`]}>Conferma la tua email</Text>

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
  light_title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.mainPurple,
    padding: 10,
    textAlign: "center"
  },
  dark_title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.lightPurple,
    padding: 10,
    textAlign: "center"
  }
})

export default ConfirmEmailScreen
