import React from "react"
import { StyleSheet, Pressable, Text } from "react-native"
import Pictograms from "../../../data/pictogramspath"
import { CaaKeyboardComponentParamList } from "root/types"
import FastImage from "react-native-fast-image"

const CaaKeyboardComponent = ({ text, uri, onPress, type }: CaaKeyboardComponentParamList) => {

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`type_${type}`]]}>
      <FastImage
        source={Pictograms[uri]}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default CaaKeyboardComponent

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: "20%",
    borderWidth: 0.5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2
  },
  image: {
    width: "70%",
    height: "70%"
  },
  text: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  type_MAIN: {
    backgroundColor: "#b5d1ff"
  },
  type_SINGLE: {
    backgroundColor: "#c9ffb5"
  },
  type_LINK: {
    backgroundColor: "#fdffb5"
  }
})

