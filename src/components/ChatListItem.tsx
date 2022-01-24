import React from "react"
import { useEffect, useState } from "react"

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
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

  const fetchChatRoom = async() => {
    DataStore.query(ChatRoom, chatRoom.id).then(setUpdatedChatRoom)
  }

  /**
   * Funzione che ritorna se l'ultimo messaggio è dell'utente loggato o
   * dell'altro nella chat
   */
  const isLastMessageMine = () => {
    if (lastMessage?.userID === currentUserId) {
      return true
    } else {
      return false
    }
  }

  /**
   * Azzera i nuovi messaggi della chatroom
   */
  const clearNewMessages = async() => {
    await DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
      updatedChatRoom.newMessages = 0
    }))
    await fetchChatRoom()
  }

  /**
   * Use Effect per fetchare l'altro utente che fa parte della chat
   */
  useEffect(() => {
    const getOtherUser = async() => {
      const users = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user)

      const user = users.find(user => user.id !== currentUserId)
      setOtherUser(user ? user : null)
    }
    getOtherUser()
  }, [])

  /**
   * Use Effect per fetchare l'ultimo messaggio della chatroom ogni volta che aggiorna
   */
  useEffect(() => {
    DataStore.query(Message, updatedChatRoom?.chatRoomLastMessageId).then(setLastMessage)
  }, [updatedChatRoom])

  /**
   * Use Effect per la subscription di aggiornamento della chatroom
   */
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

  /**
   * Use Effect per la subscription di aggiornamento del last message
   */
  useEffect(() => {
    const subscription = DataStore.observe(Message, lastMessage?.id).subscribe(msg => {
      if (msg.model === Message && msg.opType === "UPDATE" && msg.element.chatroomID === updatedChatRoom.id) {
        console.log("triggerata subscription del last message", msg.element, "\n")
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

  if (!updatedChatRoom || !otherUser) {
    return <ActivityIndicator color={Colors.mainPurple} />
  }

  return (
    <TouchableOpacity onPress={onClick}>
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
          { !isLastMessageMine() && updatedChatRoom?.newMessages > 0 ?
            <View style={styles.badgeUnread}>
              <Text style={styles.badgeText}>{updatedChatRoom?.newMessages}</Text>
            </View>
            : null }
        </View>

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
