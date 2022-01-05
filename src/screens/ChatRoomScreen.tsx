import React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native"

import { useRoute } from "@react-navigation/native"
import moment from "moment"

import ChatMessage from "../components/ChatMessage"
import InputBox from "../components/InputBox"
import {
  API,
  graphqlOperation,
  Auth
} from "aws-amplify"
import { listMessageFromChatRoom } from "../graphql/customQueries"


const ChatRoomScreen = () => {

  const [messages, setMessages] = useState([])
  const [myId, setMyId] = useState("")

  const route = useRoute()

  useEffect(() => {
    const fetchMessage = async() => {
      try {
        const messagesData = await API.graphql(
          graphqlOperation(
            listMessageFromChatRoom, {
              id: route.params.id
            }
          )
        )
        setMessages(messagesData.data.listMessages.items)
      } catch (error) {
      }
    }
    fetchMessage()
  })

  useEffect(() => {
    const fetchMyId = async() => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        setMyId(userInfo.attributes.sub)
      } catch (error) {
      }
    }
    fetchMyId()
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}>
      <FlatList
        data={messages.sort((a, b) => new moment(a?.createdAt) - new moment(b?.createdAt))}
        renderItem={({ item }) => <ChatMessage message={item} ownerId={myId}/>}
      />
      <InputBox chatRoomId={route?.params?.id} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ChatRoomScreen
