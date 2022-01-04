import React, { useEffect } from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import { withAuthenticator } from "aws-amplify-react-native"
import Navigation from "./src/navigation"
import { API, Auth, graphqlOperation } from "aws-amplify"
import { getUser } from "./src/graphql/queries"
import { createUser } from "./src/graphql/mutations"


const App = () => {

  useEffect(() => {
    const fetchUser = async() => {

      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

      if (userInfo) {

        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            { id: userInfo.attributes.sub }
          )
        )

        if (userData.data.getUser) {
          console.log("user già registrato nel db")
          return
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: "https://freesvg.org/img/abstract-user-flat-4.png",
          status: "Hello, that's my status"
        }

        await API.graphql(
          graphqlOperation(
            createUser, { input: newUser }
          )
        )
      }
    }

    fetchUser()
  })

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#e4dfe8"
  }
})

export default withAuthenticator(App)
