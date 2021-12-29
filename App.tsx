import React from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"


import Navigation from "./src/navigation"


const App = () => {

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

export default App
