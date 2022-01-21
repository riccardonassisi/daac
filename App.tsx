import React from "react"
import {
  SafeAreaView,
  StyleSheet
} from "react-native"
import Navigation from "./src/navigation"
import { KeyboardContextProvider } from "./src/keyboard/keyboard.context"
import { LoaderContextProvider } from "src/loader/loader.context"
import useColorScheme from "src/hooks/useColorScheme"

const App = () => {
  const colorScheme = useColorScheme()

  return (
    <LoaderContextProvider>
      <KeyboardContextProvider>
        <SafeAreaView style={styles.root}>
          <Navigation colorScheme={colorScheme}/>
        </SafeAreaView>
      </KeyboardContextProvider>
    </LoaderContextProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})

export default App
