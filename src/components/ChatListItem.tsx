import React from "react"
import { useEffect, useState } from "react"

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import FastImage from "react-native-fast-image"

import moment from "moment"
import { useNavigation } from "@react-navigation/native"

import Colors from "../constants/Color"
import { ChatRoom, User, ChatRoomUser } from "src/models"
import { DataStore } from "aws-amplify"

export type ChatListItemsProps = {
  currentUserId: string,
  chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemsProps) => {
  const { currentUserId, chatRoom } = props
  const [otherUser, setOtherUser] = useState<User|null>(null)

  const navigation = useNavigation()

  useEffect(() => {
    const getOtherUser = async() => {

      const users = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user)

      setOtherUser(users.find(user => user.id !== currentUserId) || null)
    }

    getOtherUser()
  }, [])

  if (!otherUser) {
    return <ActivityIndicator />
  }

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom?.id,
      name: otherUser?.name,
      image: otherUser?.imageUri,
      currentUserId
    })
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer} >
          <FastImage source={{ uri: otherUser?.imageUri }} style={styles.avatar} />
          {!!chatRoom.newMessages && <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{chatRoom?.newMessages}</Text>
          </View>}
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser?.name}</Text>
            <Text style={styles.lastMessage}>{chatRoom?.LastMessage?.content}</Text>
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom?.LastMessage && moment(chatRoom?.LastMessage?.createdAt).format("DD/MM/YYYY")}
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
    fontSize: 16,
    color: "#000"
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
