import React, { useState } from "react"
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native"
import Logo from "./../../assets/images/logo.png"

import CustomInput from "../components/forms/CustomInput"
import CustomButton from "../components/forms/CustomButton"

import { useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"

const SignInScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { height } = useWindowDimensions()
  const navigation = useNavigation()

  const onSignInPressed = async() => {
    navigation.navigate("Home")
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword")
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }

  return (
    <ScrollView>

      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

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
