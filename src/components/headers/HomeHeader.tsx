import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Colors from "../../constants/Color"

import { Auth, DataStore } from "aws-amplify"
import { StackActions, useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"
import { User } from "src/models"

export type HomeHeaderProps = {
  currentUserId: string
}

const HomeHeader = (props: HomeHeaderProps) => {

  const [currentUser, setCurrentUser] = useState<User|undefined>()
  const navigation = useNavigation()

  const { currentUserId } = props

  const fetchUser = async() => {
    await DataStore.query(User, currentUserId).then(setCurrentUser)
  }

  useEffect(() => {
    fetchUser()
    const subscription = DataStore.observe(User, currentUserId).subscribe(msg => {
      if (msg.model === User && msg.opType === "UPDATE") {
        setCurrentUser(msg.element)
      }
    })

    return () => subscription.unsubscribe()
  }, [])


  const signOut = async() => {
    try {
      await Auth.signOut()
      await DataStore.clear()
      navigation.dispatch(
        StackActions.replace("SignIn")
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      {currentUser
        ? <FastImage
          style={styles.image}
          source={{ uri: currentUser?.imageUri }}/>
        : <ActivityIndicator />}
      <Text style={styles.text}>DAAC</Text>
      <TouchableOpacity onPress={ () => signOut() }>
        <FontAwesome5
          name="sign-out-alt"
          size={30}
          color={"#fff"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.mainPurple,
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  text: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: "bold",
    paddingHorizontal: "25%"
  }
})

export default HomeHeader
