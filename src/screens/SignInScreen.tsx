import React, { useRef, useState } from "react"
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Text, Keyboard } from "react-native"
import Logo from "./../../assets/images/logo.png"

import CustomInput from "../components/forms/CustomInput"
import CustomButton from "../components/forms/CustomButton"

import { StackActions, useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"
import CustomErrorMessage from "../components/forms/CustomErrorMessage"

const SignInScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const usernameRef = useRef<any>()
  const passwordRef = useRef<any>()

  const { height } = useWindowDimensions()
  const navigation = useNavigation()

  const onSignInPressed = async() => {

    try {
      await Auth.signIn(username, password)
      navigation.dispatch(
        StackActions.replace("Home")
      )
    } catch (error) {
      setErrorMessage(error.message)
    }

  }

  const onUsernameSubmit = () => {
    passwordRef.current.focus()
  }

  const onPasswordSubmit = () => {
    onSignInPressed()
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword")
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>

      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          ref={usernameRef}
          placeholder="Username"
          value={username}
          setValue={setUsername}
          onSubmit={onUsernameSubmit}
          secureTextEntry={false}
        />
        <CustomInput
          ref={passwordRef}
          placeholder="Password"
          value={password}
          onSubmit={onPasswordSubmit}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomErrorMessage value={errorMessage}/>

        <CustomButton
          buttonText="Accedi"
          onPress={onSignInPressed}
        />

        <CustomButton
          buttonText="Password dimenticata?"
          onPress={onForgotPasswordPressed}
          type="SECONDARY"
        />

        <CustomButton
          buttonText="Non hai un account? Creane uno!"
          onPress={onSignUpPressed}
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
  logo: {
    width: "75%",
    maxWidth: 300,
    maxHeight: 300
  }
})

export default SignInScreen
