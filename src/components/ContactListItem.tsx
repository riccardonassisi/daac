import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import FastImage from "react-native-fast-image"

import { useNavigation } from "@react-navigation/native"

import { DataStore } from "aws-amplify"
import { ChatRoom, ChatRoomUser, User } from "src/models"


export type ContactListProps = {
  currentUserId: string,
  otherUser: User
}

const ContactListItem = (props: ContactListProps) => {
  const { currentUserId, otherUser } = props

  const navigation = useNavigation<any>()

  const onClick = async() => {

    const mychats = (await DataStore.query(ChatRoomUser))
      .filter(userChatRoom => userChatRoom.user.id === currentUserId)
      .map(chatRoomUser => chatRoomUser.chatRoom.id)

    const otherchats = (await DataStore.query(ChatRoomUser))
      .filter(userChatRoom => userChatRoom.user.id === otherUser.id)
      .map(chatRoomUser => chatRoomUser.chatRoom.id)

    const existingChatId = mychats.filter(value => otherchats.includes(value))

    if (existingChatId.length === 1) {
      navigation.replace("ChatRoom", {
        id: existingChatId[0],
        name: otherUser.name,
        image: otherUser.imageUri,
        currentUserId
      })
    } else {

      const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }))

      const currentUser = await DataStore.query(User, currentUserId)

      await DataStore.save(new ChatRoomUser({
        userId: currentUserId,
        user: currentUser,
        chatRoom: newChatRoom,
        chatRoomID: newChatRoom.id
      }))


      await DataStore.save(new ChatRoomUser({
        userID: otherUser.id,
        user: otherUser,
        chatRoom: newChatRoom,
        chatRoomID: newChatRoom.id
      }))


      navigation.replace("ChatRoom", {
        id: newChatRoom.id,
        name: otherUser.name,
        image: otherUser.imageUri,
        currentUserId
      })
    }
  }


  return (
    <Pressable onPress={onClick}>

      <View style={styles.container}>

        <FastImage source={{ uri: otherUser.imageUri }} style={styles.avatar} />

        <View style={styles.midContainer}>
          <Text style={styles.username}>{otherUser.name}</Text>
          <Text numberOfLines={1} style={styles.status}>{otherUser.status}</Text>
        </View>

      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    width: "100%"
  },
  midContainer: {
    justifyContent: "space-evenly",
    flex: 1
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
    fontSize: 16,
    color: "#000"
  },
  status: {
    color: "grey"
  },
  time: {
    color: "grey"
  }
})

export default ContactListItem
