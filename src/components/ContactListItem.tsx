import React from "react"
import { Image, Pressable, View, Text, StyleSheet } from "react-native"

import { User } from "../../types"

import { useNavigation } from "@react-navigation/native"

import { API, Auth, graphqlOperation } from "aws-amplify"
import { listUsersFromChatRoom } from "../graphql/customQueries"
import { createChatRoom, createChatRoomUsers } from "../graphql/mutations"

export type ChatMessageProps = {
  user: User
}

const ContactListItem = (props: ChatMessageProps) => {
  const { user } = props

  const navigation = useNavigation()

  const onClick = async() => {
    try {

      const userInfo = await Auth.currentAuthenticatedUser()

      const userFromChatRoom = await API.graphql(
        graphqlOperation(
          listUsersFromChatRoom, {
            id: userInfo.attributes.sub
          }
        )
      )

      const chatRooms = userFromChatRoom.data.listChatRoomUsers.items
      let existingChatRoomID

      chatRooms.forEach(element => {
        if (user.id === element.chatRoom.users.items[0].userID || user.id === element.chatRoom.users.items[1].userID) {
          existingChatRoomID = element.chatRoom.id
        }
      })

      if (existingChatRoomID) {
        navigation.navigate("ChatRoom", {
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

        const newChatRoom = newChatRoomData.data.createChatRoom

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
                userID: userInfo.attributes.sub,
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
    <Pressable onPress={onClick}>

      <View style={styles.container}>

        <Image source={{ uri: user.imageUri }} style={styles.avatar} />

        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
        </View>

      </View>
    </Pressable>
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
