import React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, View } from "react-native"

import { useRoute } from "@react-navigation/native"

import ChatMessage from "../components/ChatMessage"
import InputBox from "../components/InputBox"
import { Message, ChatRoom } from "src/models"
import { DataStore, SortDirection } from "aws-amplify"

import { useKeyboard } from "../keyboard/keyboard.context"
import CaaKeyboard from "../components/caa_keyboard"
import useColorScheme from "src/hooks/useColorScheme"
import Colors from "src/constants/Color"

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [chatRoom, setChatRoom] = useState<ChatRoom>()
  // const [nextLimit, setNextLimit] = useState(10)
  const caaKeyboard = useKeyboard()

  const colorScheme = useColorScheme()

  const route = useRoute()
  const currentUserId = route?.params?.currentUserId
  const currentChatRoomId = route?.params?.id


  useEffect(() => {
    const fetchChatRoom = async() => {
      DataStore.query(ChatRoom, currentChatRoomId).then(setChatRoom)
    }
    fetchChatRoom()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom, currentChatRoomId).subscribe(msg => {
      if (msg.model === ChatRoom && msg.opType === "UPDATE") {
        setChatRoom(msg.element)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchMessage = async() => {
      try {
        const fetchedMessage = await DataStore.query(Message,
          message => message.chatroomID("eq", currentChatRoomId), {
            sort: m => m.createdAt(SortDirection.DESCENDING)
          // page: 0,
          // limit: nextLimit
          })
        setMessages(fetchedMessage)
      // setNextLimit(nextLimit + 5)
      } catch (error) {
        console.warn(error)
      }
    }
    fetchMessage()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(Message).subscribe(msg => {
      if (msg.model === Message && msg.opType === "INSERT" && msg.element.chatroomID === currentChatRoomId) {
        setMessages(existingMessages => [msg.element, ...existingMessages])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (chatRoom === undefined) {
    return <ActivityIndicator color={Colors.mainPurple} />
  }

  return (
    <View
      // behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles[`${colorScheme}_container`]}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage messageProp={item} ownerId={currentUserId}/>}
        inverted
        // onEndReached={fetchMessage}
        // onEndReachedThreshold={2.5}
      />
      {caaKeyboard.visible
        ? (<CaaKeyboard currentUserId={currentUserId} chatRoom={chatRoom}/>)
        : (<InputBox currentUserId={currentUserId} chatRoom={chatRoom}/>)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dark_container: {
    flex: 1,
    backgroundColor: Colors.darkBackground
  }
})

export default ChatRoomScreen
