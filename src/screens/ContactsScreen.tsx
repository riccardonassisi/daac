import React from "react"
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from "react-native"

import ContactListItem from "../components/ContactListItem"

import { useEffect, useState } from "react"
import {
  Auth,
  DataStore
} from "aws-amplify"
import { User } from "src/models"

import useColorScheme from "src/hooks/useColorScheme"
import Colors from "src/constants/Color"

const ContactsScreen = () => {

  const [users, setUsers] = useState<User[]>([])
  const [currentUserId, setCurrentUserId] = useState<string>()

  const colorScheme = useColorScheme()

  useEffect(() => {
    const fetchUsers = async() => {
      const currentuser = await Auth.currentAuthenticatedUser()
      setCurrentUserId(currentuser?.attributes?.sub)
      const usersdata = await DataStore.query(User)
      const otherUsers = usersdata.filter(user => user.id !== currentuser?.attributes?.sub)
      setUsers(otherUsers)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe(msg => {
      if (msg.model === User && msg.opType === "INSERT") {
        setUsers(existingUsers => [msg.element, ...existingUsers])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (currentUserId === undefined) {
    return <ActivityIndicator color={Colors.mainPurple}/>
  }

  return (
    <View style={styles[`${colorScheme}_container`]}>
      {users.length > 0 ?
        (<FlatList
          style= {{
            width: "100%"
          }}
          data={users.sort((a, b) => a?.name.localeCompare(b?.name))}
          renderItem={({ item }) => <ContactListItem currentUserId={currentUserId} otherUser={item} />}
          keyExtractor={(item) => item.id}
        />)
        : (<Text>Sei l'unico utilizzatore di questa app.. grazie!</Text>)}
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
