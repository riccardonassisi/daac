import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, ScrollView } from "react-native"

import Colors from "../constants/Color"
import moment from "moment"

import ChatListItem from "../components/ChatListItem"
import NewMessageButton from "../components/NewMessageButton"
import { API, Auth, graphqlOperation } from "aws-amplify"

import { getUser } from "../graphql/customQueries"

import chatRooms from "../../data/ChatRooms"

const HomeScreen = () => {
  // const [chatRooms, setChatRooms] = useState([])

  // useEffect(() => {
  //   const fetchChatRooms = async() => {
  //     try {
  //       const userInfo = await Auth.currentAuthenticatedUser()
  //       const userData = await API.graphql(
  //         graphqlOperation(
  //           getUser, {
  //             id: userInfo.attributes.sub
  //           }
  //         )
  //       )

  //       const content = userData.data.getUser.chatRoomUser.items
  //       setChatRooms(content.sort((a, b) => new moment(b.chatRoom.lastMessage.createdAt) - new moment(a.chatRoom.lastMessage.createdAt)))
  //       // setChatRooms(content)
  //     } catch (e) {

  //     }
  //   }
  //   fetchChatRooms()
  // })

  return (
    <ScrollView>
      <View style={styles.root}>
        <FlatList
          style= {{
            width: "100%"
          }}
          data={chatRooms}
          // renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
          renderItem={({ item }) => <ChatListItem chatRoom={item} />}
          keyExtractor={(item) => item.id}
        />
        <NewMessageButton />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.mainPurple,
    padding: 10
  }
})

export default HomeScreen
