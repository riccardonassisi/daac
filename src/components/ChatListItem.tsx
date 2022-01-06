import React from "react"
import { useEffect, useState } from "react"

import { Pressable, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"

import moment from "moment"
import { useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"
import Colors from "../constants/Color"

const ChatListItem = (props) => {
  const { chatRoom } = props
  const [otherUser, setOtherUser] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    const getOtherUser = async() => {
      const userInfo = await Auth.currentAuthenticatedUser()

      if (chatRoom.users.items[1].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.users.items[0].user)
      } else {
        setOtherUser(chatRoom.users.items[1].user)
      }
    }

    getOtherUser()
  })

  if (!otherUser) {
    return null
  }

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: otherUser.name,
      image: otherUser.imageUri
    })
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer} >
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
          {/* <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>4</Text>
          </View> */}
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text style={styles.lastMessage}>{
              chatRoom.lastMessage && chatRoom.lastMessage.user.id === otherUser.id ? `${otherUser.name}: ${chatRoom.lastMessage.content}`
                : chatRoom.lastMessage && chatRoom.lastMessage.user.id !== otherUser.id ? chatRoom.lastMessage.content
                  : ""
            }</Text>
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage && moment(chatRoom?.lastMessage?.createdAt).format("DD/MM/YYYY")}
        </Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingVertical: 7.5
  },
  leftContainer: {
    flexDirection: "row"
  },
  midContainer: {
    paddingLeft: 10,
    justifyContent: "space-evenly"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  username: {
    fontWeight: "bold",
    fontSize: 16
  },
  lastMessage: {
    color: "grey"
  },
  time: {
    color: "grey"
  },
  badgeContainer: {
    backgroundColor: Colors.mainPurple,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 35
  },
  badgeText: {
    color: "#fff"
  }
})

export default ChatListItem
