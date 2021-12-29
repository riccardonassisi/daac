import React from "react"
import { useEffect, useState } from "react"

import { Pressable, View, Image, Text, StyleSheet } from "react-native"

import moment from "moment"
import { ChatRoom } from "../../types"

import { useNavigation } from "@react-navigation/native"

import { Auth } from "aws-amplify"

export type ChatListItemProps = {
  chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props
  // const [otherUser, setOtherUser] = useState(null)
  const otherUser = chatRoom.users[1]
  const navigation = useNavigation()

  // useEffect(() => {
  //   const getOtherUser = async() => {
  //     const userInfo = await Auth.currentAuthenticatedUser()

  //     if (chatRoom.users.items[1].user.id === userInfo.attributes.sub) {
  //       setOtherUser(chatRoom.users.items[0].user)
  //     } else {
  //       setOtherUser(chatRoom.users.items[1].user)
  //     }
  //   }

  //   getOtherUser()
  // })

  // if (!otherUser) {
  //   return null
  // }

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: otherUser.name
    })
  }

  return (
    <Pressable onPress={onClick}>

      <View style={styles.container}>

        <View style={styles.leftContainer} >
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            {/* <Text style={styles.lastMessage}>{
              chatRoom.lastMessage && chatRoom.lastMessage.user.id === otherUser.id ? `${otherUser.name}: ${chatRoom.lastMessage.content}`
                : chatRoom.lastMessage && chatRoom.lastMessage.user.id !== otherUser.id ? chatRoom.lastMessage.content
                  : ""
            }</Text> */}
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage && moment(chatRoom?.lastMessage?.createdAt).format("DD/MM/YYYY")}
        </Text>

      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5
  },
  leftContainer: {
    flexDirection: "row"
  },
  midContainer: {
    justifyContent: "space-evenly"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 0
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
  }
})

export default ChatListItem
