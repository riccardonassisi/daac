import React, { useRef, useState } from "react"
import { View, StyleSheet, useWindowDimensions, ScrollView, Keyboard } from "react-native"
import Logo from "@icons/logo.png"

import CustomInput from "../components/forms/CustomInput"
import CustomButton from "../components/forms/CustomButton"

import { useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"
import CustomErrorMessage from "../components/forms/CustomErrorMessage"
import FastImage from "react-native-fast-image"
import { useLoader } from "src/loader/loader.context"

const SignInScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const usernameRef = useRef<any>()
  const passwordRef = useRef<any>()

  const { height } = useWindowDimensions()
  const navigation = useNavigation()
  const loader = useLoader()

  const onSignInPressed = async() => {
    try {
      Keyboard.dismiss()
      loader.setLoaderVisible(true)
      await Auth.signIn(username, password)
    } catch (error) {
      loader.dismissLoader()
      setErrorMessage(error.message)
    }
  }

  // const onUsernameSubmit = () => {
  //   passwordRef.current.focus()
  // }

  // const onPasswordSubmit = () => {
  //   onSignInPressed()
  // }

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword")
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>

      <View style={styles.root}>
        <FastImage
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          ref={usernameRef}
          placeholder="Username"
          value={username}
          setValue={setUsername}
          // onSubmit={onUsernameSubmit}
          secureTextEntry={false}
        />
        <CustomInput
          ref={passwordRef}
          placeholder="Password"
          value={password}
          // onSubmit={onPasswordSubmit}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomErrorMessage value={errorMessage}/>

        <CustomButton
          buttonText="Accedi"
          onPress={onSignInPressed}
          type="PRIMARY"
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
