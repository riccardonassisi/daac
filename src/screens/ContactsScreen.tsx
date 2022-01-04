import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ContactListItem from "../components/ContactListItem"

import { useEffect, useState } from "react"
import {
  API,
  graphqlOperation,
  Auth
} from "aws-amplify"

import { listUsers } from "../graphql/queries"

export default function ContactsScreen() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )

        const currentUser = await Auth.currentAuthenticatedUser()
        const otherUsers = usersData.data.listUsers.items.filter(e => e.id !== currentUser.attributes.sub)

        setUsers(otherUsers)

        // setUsers(usersData.data.listUsers.items)
      } catch (error) {
        console.warn(error)
      }
    }

    fetchUsers()
  })

  return (
    <View style={styles.container}>
      <FlatList
        style= {{
          width: "100%"
        }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
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
