import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import Navigation from "./src/navigation"
import { Auth } from "aws-amplify"
import { KeyboardContextProvider } from "./src/keyboard/keyboard.context"

const App = () => {

  const [logged, setLogged] = useState<boolean>()
  const [userid, setUserid] = useState("")

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUserid(user.attributes.sub)
        setLogged(true)
      } catch (error) {
        setLogged(false)
      }
    }

    fetchUser()
  }, [])

  if (logged === undefined) {
    return null
  } else {
    return (
      <KeyboardContextProvider>
        <SafeAreaView style={styles.root}>
          <Navigation currentUserId={userid} isLoggedIn={logged}/>
        </SafeAreaView>
      </KeyboardContextProvider>
    )
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff"
  }
})

export default App
