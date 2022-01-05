import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { StyleSheet } from "react-native"

import CustomButton from "../components/forms/CustomButton"
import CustomInput from "../components/forms/CustomInput"
import Colors from "../constants/Color"

import { useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"

const SignUpScreen = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")

  const navigation = useNavigation()

  const onSignUpPressed = async() => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,          // optional
          phone_number: phoneNumber   // optional - E.164 number convention
          // other custom attributes
        }
      })
      console.log(user)
      navigation.navigate("ConfirmEmail")
    } catch (error) {
      console.log("error signing up:", error)
    }
  }

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  const onTermsPressed = () => {
    console.warn("TERMS")
  }

  const onPrivacyPressed = () => {
    console.warn("PRIVACY")
  }

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text style={styles.title}>
          Crea un account
        </Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Telefono"
          value={phoneNumber}
          setValue={setPhoneNumber}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Ripeti password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <Text style={styles.text}>Registrandoti, confermi di accettare i nostri <Text style={styles.link} onPress={onTermsPressed}>Termini e Condizioni d'Uso</Text> e la nostra <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.</Text>

        <CustomButton
          buttonText="Registrati"
          onPress={onSignUpPressed}
        />

        <CustomButton
          buttonText="Hai un account? Accedi qui"
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
  },
  text: {
    padding: 10
  },
  link: {
    color: Colors.mainPurple

  }
})

export default SignUpScreen
