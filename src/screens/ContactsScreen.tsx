import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ContactListItem from "../components/ContactListItem"

import { useEffect, useState } from "react"
import {
  DataStore
} from "aws-amplify"
import { User } from "src/models"

import { useRoute } from "@react-navigation/native"
import useColorScheme from "src/hooks/useColorScheme"
import Colors from "src/constants/Color"

const ContactsScreen = () => {

  const [users, setUsers] = useState<User[]>([])
  const route = useRoute()

  const colorScheme = useColorScheme()

  const currentUserId = route?.params?.currentUserId

  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe(msg => {
      if (msg.model === User && msg.opType === "INSERT") {
        setUsers(existingUsers => [msg.element, ...existingUsers])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchUsers = async() => {
      const otherUsers = (await DataStore.query(User)).filter(user => user.id !== currentUserId)
      setUsers(otherUsers)
    }
    fetchUsers()
  }, [])


  return (
    <View style={styles[`${colorScheme}_container`]}>
      <FlatList
        style= {{
          width: "100%"
        }}
        data={users.sort((a, b) => a?.name.localeCompare(b?.name))}
        renderItem={({ item }) => <ContactListItem currentUserId={currentUserId} otherUser={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  dark_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBackground
  }
})

export default ContactsScreen
