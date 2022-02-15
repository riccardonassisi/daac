import React, { useEffect, useState } from "react"

import { FlatList, Text, View, StyleSheet } from "react-native"
import FastImage from "react-native-fast-image"
import Colors from "../constants/Color"

import moment from "moment"

import Pictograms from "../../data/pictogramspath"
import { Message } from "src/models"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { DataStore } from "aws-amplify"

export type ChatMessageProps = {
  messageProp: Message,
  ownerId: string
}

const ChatMessage = (props: ChatMessageProps) => {
  const { messageProp, ownerId } = props

  const [message, setMessage] = useState<Message>(messageProp)

  const isMyMessage = () => {
    return message?.userID === ownerId
  }

  useEffect(() => {
    const subscription = DataStore.observe(Message, message.id).subscribe(msg => {
      if (msg.model === Message && msg.opType === "UPDATE") {
        setMessage((message) => ({ ...message, ...msg.element }))
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const setAsRead = async() => {
      if (isMyMessage() === false && message.status !== "READ") {
        await DataStore.save(
          Message.copyOf(message, (updated) => {
            updated.status = "READ"
          })
        )
      }
    }
    setAsRead()
  }, [isMyMessage(), message])


  return (
    <View style={styles.container}>
      <View style={[
        isMyMessage() ? styles.messageSentBox : styles.messageReceivedBox
      ]}>
        <Text style={styles.message}>{message?.content}</Text>
        <FlatList
          data={message?.urls}

          // renderItem={({ uri }) => (
          //   <FastImage
          //     style={styles.image}
          //     source={Pictograms[uri]}
          //   />
          // )}

          renderItem={({ uri }) => {
            if (uri[0] === "_") {
              return (<FastImage
                style={styles.image}
                source={Pictograms[uri]}
              />)
            } else {
              return (<FastImage
                style={styles.image}
                source={{ uri: uri }}
              />)
            }
          }}
          horizontal={true}
        />
        <View style={styles.bottom}>
          <Text style={styles.time}>{moment(message?.createdAt).fromNow()}</Text>
          {isMyMessage() && <FontAwesome5
            name={message.status === "SENT" ? "check" : "check-double"}
            size={10}
            color={message.status === "READ" ? Colors.mainPurple : "grey"}
          />}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  messageReceivedBox: {
    backgroundColor: "#dabcf7",
    marginRight: 50,
    padding: 10,
    borderRadius: 10
  },
  messageSentBox: {
    backgroundColor: "#e5e5e5",
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
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  time: {
    fontSize: 11,
    color: "grey",
    paddingRight: 5
  },
  image: {
    width: 50,
    height: 50
  }
})

export default ChatMessage
