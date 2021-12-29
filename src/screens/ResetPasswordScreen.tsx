import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")

  const navigation = useNavigation()

  const onConfirmPressed = () => {
    navigation.navigate("Home")
  }
  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>Reimposta la password</Text>

        <CustomInput
          placeholder="Codice di conferma"
          value={confirmationCode}
          setValue={setConfirmationCode}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Nuova password"
          value={newPassword}
          setValue={setNewPassword}
          secureTextEntry={false}
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
    padding: 10,
    textAlign: "center"
  }
})

export default ResetPasswordScreen
