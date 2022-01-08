import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"

import { User } from "../../types"

import { useNavigation } from "@react-navigation/native"

import { API, graphqlOperation } from "aws-amplify"
import { listUsersFromChatRoom } from "../graphql/customQueries"
import { createChatRoom, createChatRoomUsers } from "../graphql/mutations"

export type ChatMessageProps = {
  currentUserId: string,
  user: User
}

const ContactListItem = (props: ChatMessageProps) => {
  const { currentUserId, user } = props

  const navigation = useNavigation<any>()

  const onClick = async() => {
    try {
      const userFromChatRoom = await API.graphql(
        graphqlOperation(
          listUsersFromChatRoom, {
            id: currentUserId
          }
        )
      )

      const chatRooms = userFromChatRoom?.data?.listChatRoomUsers?.items
      let existingChatRoomID

      chatRooms.forEach(element => {
        if (user.id === element?.chatRoom?.users?.items[0]?.userID || user.id === element?.chatRoom?.users?.items[1]?.userID) {
          existingChatRoomID = element?.chatRoom?.id
        }
      })

      if (existingChatRoomID) {
        navigation.replace("ChatRoom", {
          id: existingChatRoomID,
          name: user.name
        })

      } else {
        const newChatRoomData = await API.graphql(
          graphqlOperation(
            createChatRoom, {
              input: {}
            }
          )
        )

        if (!newChatRoomData) {
          return
        }

        const newChatRoom = newChatRoomData?.data?.createChatRoom

        await API.graphql(
          graphqlOperation(
            createChatRoomUsers, {
              input: {
                userID: user.id,
                chatRoomID: newChatRoom.id
              }
            }
          )
        )

        await API.graphql(
          graphqlOperation(
            createChatRoomUsers, {
              input: {
                userID: currentUserId,
                chatRoomID: newChatRoom.id
              }
            }
          )
        )
        navigation.navigate("ChatRoom", {
          id: newChatRoom.id,
          name: user.name
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <TouchableOpacity onPress={onClick}>

      <View style={styles.container}>

        <FastImage source={{ uri: user.imageUri }} style={styles.avatar} />

        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    width: "100%"
  },
  midContainer: {
    justifyContent: "space-evenly",
    flex: 1
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 0
  },
  username: {
    fontWeight: "bold",
    fontSize: 16
  },
  status: {
    color: "grey"
  },
  time: {
    color: "grey"
  }
})

export default ContactListItem
