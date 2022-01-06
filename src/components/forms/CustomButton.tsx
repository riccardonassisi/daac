import React from "react"
import { Pressable, Text, StyleSheet } from "react-native"
import { CustomButtonParamList } from "../../../types"
import Colors from "../../constants/Color"

const CustomButton = ({ buttonText, onPress, type = "PRIMARY" }: CustomButtonParamList) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`button_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{buttonText}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5
  },
  button_PRIMARY: {
    backgroundColor: Colors.mainPurple
  },
  button_SECONDARY: {
    backgroundColor: "white",
    color: Colors.mainPurple,
    borderColor: Colors.mainPurple,
    borderWidth: 2
  },
  button_TEXTONLY: {
    fontWeight: "bold"
  },
  text: {
    fontWeight: "bold"
  },
  text_PRIMARY: {
    color: "white"
  },
  text_SECONDARY: {
    color: Colors.mainPurple
  }
})

export default CustomButton