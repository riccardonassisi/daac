import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ContactListItem from "../components/ContactListItem"

import { useEffect, useState } from "react"
import {
  API,
  graphqlOperation
} from "aws-amplify"

import { listUsers } from "../graphql/queries"
import { useRoute } from "@react-navigation/native"

const ContactsScreen = () => {

  const [users, setUsers] = useState([])
  const route = useRoute()

  const currentUserId = route?.params?.currentUserId

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )

        const otherUsers = usersData?.data?.listUsers?.items?.filter(e => e.id !== currentUserId)

        setUsers(otherUsers)
      } catch (error) {
        console.warn(error)
      }
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
        renderItem={({ item }) => <ContactListItem currentUserId={currentUserId} user={item} />}
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
