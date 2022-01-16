import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Text } from "react-native"
import { useRoute } from "@react-navigation/native"


import ChatListItem from "../components/ChatListItem"
import NewMessageButton from "../components/NewMessageButton"
import { DataStore } from "aws-amplify"

import { ChatRoom, ChatRoomUser } from "src/models"
import moment from "moment"

export type HomeScreenProps = {
  currentUserId: string
}

const HomeScreen = (props: HomeScreenProps) => {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])

  let { currentUserId } = props

  if (!currentUserId) {
    const route = useRoute()
    currentUserId = route?.params?.currentUserId
  }

  const fetchChatRooms = async() => {
    try {
      const chats = (await DataStore.query(ChatRoomUser))
        .filter(userChatRoom => userChatRoom.user.id === currentUserId)
        .map(userChatRoom => userChatRoom.chatRoom)
        .sort((a, b) => new moment(b?.updatedAt) - new moment(a?.updatedAt))
      setChatRooms(chats)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchChatRooms()
  }, [chatRooms])

  return (
    <View style={styles.root}>
      {chatRooms.length > 0
        ? (<FlatList
          style= {{
            width: "100%"
          }}
          data={chatRooms}
          renderItem={({ item }) => <ChatListItem currentUserId={currentUserId} chatRoom={item} />}
          keyExtractor={(item) => item.id}
        />) : (
          <Text style={styles.empty}>Non ci sono ancora chat</Text>
        )}

      <NewMessageButton currentUserId={currentUserId}/>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  empty: {
    fontWeight: "bold",
    padding: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 15
  }
})

export default HomeScreen
