import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import Navigation from "./src/navigation"
import { API, Auth, graphqlOperation } from "aws-amplify"
import { getUser } from "./src/graphql/queries"
import { createUser } from "./src/graphql/mutations"
import Colors from "./src/constants/Color"

const App = () => {

  const [logged, setLogged] = useState()

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        setLogged(true)

        /**
         * QUESTO PEZZO VA SPOSTATO NEL SIGN UP, USANDO COME METODO
         * PER LE API LA CHIAVE DA STORARE NEL .ENV
         */
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            { id: userInfo.attributes.sub }
          )
        )

        if (!userData.data.getUser) {
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
        /* ----------------------------------------------------------- */

      } catch (error) {
        setLogged(false)
      }
    }

    fetchUser()
  })

  if (logged === undefined) {
    return null
  } else {
    return (
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.lightPurple
  }
})

export default App
