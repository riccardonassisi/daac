import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ContactListItem from "../components/ContactListItem"

import { useEffect, useState } from "react"
import {
  DataStore
} from "aws-amplify"
import { User } from "src/models"

import { useRoute } from "@react-navigation/native"

const ContactsScreen = () => {

  const [users, setUsers] = useState<User[]>([])
  const route = useRoute()

  const currentUserId = route?.params?.currentUserId

  useEffect(() => {
    const fetchUsers = async() => {
      const otherUsers = (await DataStore.query(User)).filter(user => user.id !== currentUserId)
      setUsers(otherUsers)
    }
    fetchUsers()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style= {{
          width: "100%"
        }}
        data={users}
        renderItem={({ item }) => <ContactListItem currentUserId={currentUserId} otherUser={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
})

export default ContactsScreen
