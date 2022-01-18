import React from "react"
import { useEffect, useState } from "react"

import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import FastImage from "react-native-fast-image"

import moment from "moment"
import { useNavigation } from "@react-navigation/native"

import Colors from "../constants/Color"
import { ChatRoom, User, ChatRoomUser, Message } from "src/models"
import { DataStore } from "aws-amplify"
import useColorScheme from "src/hooks/useColorScheme"

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
  const colorScheme = useColorScheme()

  const isLastMessageMine = () => {
    if (lastMessage?.userID === currentUserId) {
      return true
    } else {
      return false
    }
  }

  const clearNewMessages = async() => {
    await DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
      updatedChatRoom.newMessages = 0
    }))
  }

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

  const onClick = () => {
    if (!isLastMessageMine()) {
      clearNewMessages()
    }

    navigation.navigate("ChatRoom", {
      id: chatRoom?.id,
      name: otherUser?.name,
      image: otherUser?.imageUri,
      currentUserId
    })
  }

  if (!updatedChatRoom || !lastMessage) {
    return <ActivityIndicator />
  }

  return (
    <Pressable onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer} >
          <FastImage source={{ uri: otherUser?.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles[`${colorScheme}_username`]}>{otherUser?.name}</Text>
            <Text style={
              !isLastMessageMine() && lastMessage?.status !== "READ"
                ? styles.lastMessageUnread
                : styles.lastMessage}>
              {lastMessage?.content}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={!isLastMessageMine() && lastMessage?.status !== "READ"
            ? styles.lastMessageUnread
            : styles.lastMessage}>
            {lastMessage && moment(lastMessage?.createdAt).format("DD/MM/YYYY")}
          </Text>
          {!isLastMessageMine() && chatRoom?.newMessages > 0 ?
            <View style={styles.badgeUnread}><Text style={styles.badgeText}>{chatRoom?.newMessages}</Text></View>
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
  light_username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000"
  },
  dark_username: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.lightPurple
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
    borderRadius: 10,
    alignItems: "center"
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold"
  }
})

export default ChatListItem
