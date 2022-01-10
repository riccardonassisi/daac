import React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native"

import { useRoute } from "@react-navigation/native"
import moment from "moment"

import ChatMessage from "../components/ChatMessage"
import InputBox from "../components/InputBox"
import {
  API,
  graphqlOperation
} from "aws-amplify"
import { listMessageFromChatRoom } from "../graphql/customQueries"

import { useKeyboard } from "../keyboard/keyboard.context"
import CaaKeyboard from "../components/caa_keyboard"

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState([])
  const caaKeyboard = useKeyboard()

  const route = useRoute()
  const currentUserId = route?.params?.currentUserId

  useEffect(() => {
    const fetchMessage = async() => {
      try {
        const messagesData = await API.graphql(
          graphqlOperation(
            listMessageFromChatRoom, {
              id: route?.params?.id
            }
          )
        )
        setMessages(messagesData?.data?.listMessages?.items)
      } catch (error) {
      }
    }
    fetchMessage()
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}>
      <FlatList
        data={messages.sort((a, b) => new moment(b?.createdAt) - new moment(a?.createdAt))}
        renderItem={({ item }) => <ChatMessage message={item} ownerId={currentUserId}/>}
        inverted
      />
      {caaKeyboard.visible
        ? (<CaaKeyboard currentUserId={currentUserId} chatRoomId={route?.params?.id}/>)
        : (<InputBox currentUserId={currentUserId} chatRoomId={route?.params?.id} />)
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
