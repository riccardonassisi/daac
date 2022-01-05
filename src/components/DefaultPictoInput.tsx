import React, { useEffect, useState } from "react"
import { FlatList, Image, Pressable, Text, View, StyleSheet } from "react-native"

import { StandardMessage } from "../../types"

import { API, Auth, graphqlOperation } from "aws-amplify"

import { listDefaultMessages } from "../graphql/queries"
import { createMessage, updateChatRoom } from "../graphql/mutations"
import Colors from "../constants/Color"

export type DefaultPictoInputProps = {
  chatRoomId: string
}

const DefaultPictoInput = (props: DefaultPictoInputProps) => {

  const { chatRoomId } = props

  const [myUserID, setMyUserID] = useState(null)
  const [defaultMessages, setDefaultMessages] = useState([])

  useEffect(() => {
    const fetchUser = async() => {
      const userInfo = await Auth.currentAuthenticatedUser()
      setMyUserID(userInfo.attributes.sub)
    }
    fetchUser()
  })

  useEffect(() => {
    const getDefaultMessages = async() => {
      try {
        const defMessages = await API.graphql(
          graphqlOperation(
            listDefaultMessages
          )
        )
        setDefaultMessages(defMessages.data.listDefaultMessages.items)
      } catch (error) {
      }
    }
    getDefaultMessages()
  })

  const updateLastMessage = async(messageId: string) => {

    try {
      await API.graphql(
        graphqlOperation(
          updateChatRoom, {
            input: {
              id: chatRoomId,
              chatRoomLastMessageId: messageId
            }
          }
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const onSendPress = async(message: StandardMessage) => {

    try {
      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message.content,
              urls: message.urls,
              messageUserId: myUserID,
              chatRoomMessagesId: chatRoomId
            }
          }
        )
      )
      await updateLastMessage(newMessageData.data.createMessage.id)
    } catch (error) {
      console.error(error)
    }
  }

  const DefaultMessage = (message: StandardMessage) => {
    return (
      <Pressable
        onPress={() => {
          onSendPress(message)
        }}
      >
        <View style={styles.message}>
          <Text style={styles.textMessage}>
            {message.content}
          </Text>
          <FlatList
            data={message?.urls}
            renderItem={({ item }) => <Image
              style={styles.image}
              source={{ uri: item }}
            />}
            horizontal={true}
          />
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={defaultMessages}
        renderItem={({ item }) => DefaultMessage(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    padding: 5,
    marginRight: 5,
    height: 185,
    borderColor: Colors.mainPurple,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20
  },
  message: {
    backgroundColor: "#fff",
    padding: 5,
    margin: 2.5,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.mainPurple
  },
  textMessage: {
    color: "#000"
  }
})

export default DefaultPictoInput
