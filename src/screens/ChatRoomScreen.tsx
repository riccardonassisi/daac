import React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native"

import { useRoute } from "@react-navigation/native"
import moment from "moment"

import ChatMessage from "../components/ChatMessage"
import InputBox from "../components/InputBox"
import { Message, ChatRoom } from "src/models"
import { DataStore } from "aws-amplify"

import { useKeyboard } from "../keyboard/keyboard.context"
import CaaKeyboard from "../components/caa_keyboard"

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [chatRoom, setChatRoom] = useState<ChatRoom>()
  const caaKeyboard = useKeyboard()

  const route = useRoute()
  const currentUserId = route?.params?.currentUserId

  useEffect(() => {
    DataStore.query(ChatRoom, route?.params?.id).then(setChatRoom)
  }, [])

  useEffect(() => {
    const fetchMessage = async() => {
      const fetchedMessage = await DataStore.query(Message,
        message => message.chatroomID("eq", route?.params?.id))
      setMessages(fetchedMessage)
    }
    fetchMessage()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(Message).subscribe(msg => {
      if (msg.model === Message && msg.opType === "INSERT") {
        setMessages(existingMessages => [msg.element, ...existingMessages])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}>
      <FlatList
        data={messages.sort((a, b) => new moment(b?.createdAt) - new moment(a?.createdAt))}
        renderItem={({ item }) => <ChatMessage messageProp={item} ownerId={currentUserId}/>}
        inverted
      />
      {caaKeyboard.visible
        ? (<CaaKeyboard currentUserId={currentUserId} chatRoom={chatRoom}/>)
        : (<InputBox currentUserId={currentUserId} chatRoom={chatRoom}/>)
      }
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})

export default ChatRoomScreen
