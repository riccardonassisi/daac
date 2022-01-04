import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native"

import Colors from "../constants/Color"
import moment from "moment"

import ChatListItem from "../components/ChatListItem"
import NewMessageButton from "../components/NewMessageButton"
import { API, Auth, graphqlOperation } from "aws-amplify"

import { getUser } from "../graphql/customQueries"

const HomeScreen = () => {
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    const fetchChatRooms = async() => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: userInfo.attributes.sub
            }
          )
        )
        if (userData !== null) {
          const content = userData?.data?.getUser?.chatRoomUser?.items
          // setChatRooms(content.sort((a, b) => new moment(b.chatRoom.lastMessage.createdAt) - new moment(a.chatRoom.lastMessage.createdAt)))
          setChatRooms(content)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchChatRooms()
  })

  return (
    // <ScrollView>
    <View style={styles.root}>
      {chatRooms.length > 0
        ? (<FlatList
          style= {{
            width: "100%"
          }}
          data={chatRooms}
          renderItem={({ item }) => <ChatListItem chatRoom={item?.chatRoom} />}
          // renderItem={({ item }) => <ChatListItem chatRoom={item} />}
          keyExtractor={(item) => item?.chatRoom.id}
        />) : (
          <Text style={styles.title}>Such empty</Text>
        )}

      <NewMessageButton />
    </View>
    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.mainPurple,
    padding: 10,
    borderColor: Colors.mainPurple,
    borderWidth: 0.5
  }
})

export default HomeScreen
