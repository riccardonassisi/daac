import React from "react"
import { useEffect, useState } from "react"

import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import FastImage from "react-native-fast-image"

import moment from "moment"
import { useNavigation } from "@react-navigation/native"

import Colors from "../constants/Color"
import { ChatRoom, User, ChatRoomUser, Message } from "src/models"
import { DataStore } from "aws-amplify"

export type ChatListItemsProps = {
  currentUserId: string,
  chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemsProps) => {
  const { currentUserId, chatRoom } = props
  const [otherUser, setOtherUser] = useState<User|null>(null)
  const [lastMessage, setLastMessage] = useState<Message|undefined>()
  const [updatedChatRoom, setUpdatedChatRoom] = useState<ChatRoom>(chatRoom)

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

  useEffect(() => {
    if (!updatedChatRoom?.chatRoomLastMessageId) {
      return
    }
    DataStore.query(Message, updatedChatRoom?.chatRoomLastMessageId).then(setLastMessage)
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom, chatRoom.id).subscribe(msg => {
      if (msg.model === ChatRoom && msg.opType === "UPDATE") {
        setUpdatedChatRoom(msg.element)
        if (msg.element.chatRoomLastMessageId) {
          DataStore.query(Message, msg.element.chatRoomLastMessageId).then(setLastMessage)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(Message, lastMessage?.id).subscribe(msg => {
      if (msg.model === Message && msg.opType === "UPDATE") {
        setLastMessage(msg.element)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!updatedChatRoom || !lastMessage) {
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
    <Pressable onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer} >
          <FastImage source={{ uri: otherUser?.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser?.name}</Text>
            <Text style={
              lastMessage?.userID !== currentUserId && lastMessage?.status !== "READ"
                ? styles.lastMessageUnread
                : styles.lastMessage}>
              {lastMessage?.content}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={lastMessage?.userID !== currentUserId && lastMessage?.status !== "READ"
            ? styles.lastMessageUnread
            : styles.lastMessage}>
            {lastMessage && moment(lastMessage?.createdAt).format("DD/MM/YYYY")}
          </Text>
          {lastMessage?.userID !== currentUserId && lastMessage?.status !== "READ" ?
            <View style={styles.badgeUnread} />
            : null}
        </View>

      </View>
    </Pressable>
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
  rightContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
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
  lastMessageUnread: {
    color: Colors.mainPurple,
    fontWeight: "bold"
  },
  time: {
    color: "grey"
  },
  badgeUnread: {
    backgroundColor: Colors.mainPurple,
    width: 20,
    height: 20,
    borderRadius: 10
  },
  badgeText: {
    color: "#fff"
  }
})

export default ChatListItem
