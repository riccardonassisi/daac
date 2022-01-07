import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import Navigation from "./src/navigation"
import { Auth } from "aws-amplify"
import Colors from "./src/constants/Color"
import { KeyboardContextProvider } from "./src/keyboard/keyboard.context"

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
      <KeyboardContextProvider>
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
      </KeyboardContextProvider>
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
