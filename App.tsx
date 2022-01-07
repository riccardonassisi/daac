import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import Navigation from "./src/navigation"
import { Auth } from "aws-amplify"
import Colors from "./src/constants/Color"

const App = () => {

  const [logged, setLogged] = useState()

  useEffect(() => {
    const fetchUser = async() => {
      try {
        await Auth.currentAuthenticatedUser()
        setLogged(true)
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
        <Navigation isLoggedIn={logged}/>
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
