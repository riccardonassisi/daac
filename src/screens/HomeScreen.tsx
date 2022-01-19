import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native"
import { useRoute } from "@react-navigation/native"


import ChatListItem from "../components/ChatListItem"
import NewMessageButton from "../components/NewMessageButton"
import { DataStore } from "aws-amplify"

import { ChatRoom, ChatRoomUser } from "src/models"
import moment from "moment"
import useColorScheme from "src/hooks/useColorScheme"
import Colors from "src/constants/Color"

export type HomeScreenProps = {
  currentUserId: string
}

const HomeScreen = (props: HomeScreenProps) => {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]|undefined>()
  const colorScheme = useColorScheme()
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

  if (chatRooms === undefined) {
    return <ActivityIndicator color={Colors.mainPurple} />
  }

  return (
    <View style={styles[`${colorScheme}_root`]}>
      {chatRooms.length > 0
        ? (<FlatList
          style= {{
            width: "100%"
          }}
          data={chatRooms}
          renderItem={({ item }) => <ChatListItem currentUserId={currentUserId} chatRoom={item} />}
          keyExtractor={(item) => item.id}
        />) : (
          <Text style={styles[`${colorScheme}_empty`]}>Non ci sono ancora chat</Text>
        )}

      <NewMessageButton currentUserId={currentUserId}/>
    </View>
  )
}

const styles = StyleSheet.create({
  light_root: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  light_empty: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 16,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 15
  },
  dark_root: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBackground
  },
  dark_empty: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 16,
    borderColor: Colors.lightPurple,
    borderWidth: 2,
    borderRadius: 15
  }
})

export default HomeScreen
