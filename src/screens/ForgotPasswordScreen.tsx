import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/forms/CustomButton"
import CustomInput from "../components/forms/CustomInput"
import CustomErrorMessage from "../components/forms/CustomErrorMessage"
import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import useColorScheme from "src/hooks/useColorScheme"

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigation = useNavigation()

  const colorScheme = useColorScheme()

  const onConfirmPressed = async() => {
    try {
      await Auth.forgotPassword(username)
      navigation.navigate("ResetPassword")
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles[`${colorScheme}_title`]}>Reimposta la password</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={true}
        />

        <CustomErrorMessage value={errorMessage}/>

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
  light_title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.mainPurple,
    padding: 10
  },
  dark_title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.lightPurplei,
    padding: 10
  }
})

export default ForgotPasswordScreen
