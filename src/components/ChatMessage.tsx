import React from "react"

import { FlatList, Image, Text, View, StyleSheet } from "react-native"
import Colors from "../constants/Color"

import moment from "moment"
import { Message } from "../../types"

export type ChatMessageProps = {
  message: Message,
  ownerId: string
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message, ownerId } = props

  const isMyMessage = () => {
    return message.user.id === ownerId
  }

  return (
    <View style={styles.container}>
      <View style={[
        isMyMessage() ? styles.messageSentBox : styles.messageReceivedBox
      ]}>
        {!isMyMessage() && <Text style={styles.name}>{message?.user?.name}</Text>}
        <Text style={styles.message}>{message?.content}</Text>
        <FlatList
          data={message?.urls}
          renderItem={({ item }) => <Image
            style={styles.image}
            source={{ uri: item }}
          />}
          horizontal={true}
        />
        <Text style={styles.time}>{moment(message?.createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  messageReceivedBox: {
    backgroundColor: "#e5e5e5",
    marginRight: 50,
    padding: 10,
    borderRadius: 10
  },
  messageSentBox: {
    backgroundColor: "#d5ffa5",
    marginLeft: 50,
    padding: 10,
    borderRadius: 10
  },
  name: {
    color: Colors.mainPurple,
    fontWeight: "bold",
    marginBottom: 2.5,
    fontSize: 12
  },
  message: {
    color: "black"
  },
  time: {
    fontSize: 11,
    textAlign: "right",
    color: "grey"
  },
  image: {
    width: 50,
    height: 50
  }
})

export default ChatMessage
