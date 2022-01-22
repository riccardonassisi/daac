import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Text } from "react-native"

import ChatListItem from "../components/ChatListItem"
import NewMessageButton from "../components/NewMessageButton"
import { Auth, DataStore, Hub } from "aws-amplify"

import { ChatRoom, ChatRoomUser } from "src/models"
import moment from "moment"
import useColorScheme from "src/hooks/useColorScheme"
import Colors from "src/constants/Color"

const HomeScreen = () => {

  const [currentUserId, setCurrentUserId] = useState<string>()
  const [chatRooms, setChatRooms] = useState<ChatRoom[]|undefined>()

  const colorScheme = useColorScheme()

  const fetchChatRooms = async() => {
    try {
      const userdata = await Auth.currentAuthenticatedUser()
      setCurrentUserId(userdata?.attributes?.sub)
      const chats = (await DataStore.query(ChatRoomUser))
        .filter(userChatRoom => userChatRoom.user.id === userdata?.attributes?.sub)
        .map(userChatRoom => userChatRoom.chatRoom)
        .sort((a, b) => new moment(b?.updatedAt) - new moment(a?.updatedAt))
      setChatRooms(chats)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    const listener = Hub.listen("datastore", async(hubData) => {
      const { payload: { event, data } } = hubData
      if (event === "ready") {
        fetchChatRooms()
      }
    })
    return () => listener()
  }, [])

  useEffect(() => {
    fetchChatRooms()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom).subscribe(msg => {
      if (msg.model === ChatRoom && msg.opType === "INSERT") {
        fetchChatRooms()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (chatRooms === undefined || currentUserId === undefined) {
    return null
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
