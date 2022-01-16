import React from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import FastImage from "react-native-fast-image"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "../../constants/Color"

export type ChatRoomHeaderProps = {
name: string,
image: string
}

const ChatRoomHeader = (props: ChatRoomHeaderProps) => {

  const { name, image } = props

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{ uri: image }}/>
      <Text style={styles.text}>{name}</Text>
      {/* <Pressable>
        <FontAwesome5
          name="ellipsis-v"
          size={20}
          color={"#fff"}
        />
      </Pressable> */}
    </View>
  )
}

export default ChatRoomHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.mainPurple,
    paddingRight: 90
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  text: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: "bold",
    paddingLeft: "20%"
  }
})

