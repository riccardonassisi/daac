import React from "react"
import { Pressable, View, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { useNavigation } from "@react-navigation/native"
import Colors from "../constants/Color"

const NewMessageButton = () => {

  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate("Contacts")
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <FontAwesome5
          name="pencil-alt"
          size={30}
          color={"white"}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: Colors.mainPurple,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 20
  }
})

export default NewMessageButton
