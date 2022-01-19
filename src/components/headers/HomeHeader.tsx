import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Colors from "../../constants/Color"

import { Auth, DataStore } from "aws-amplify"
import { StackActions, useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"
import { User } from "src/models"
import { useLoader } from "src/loader/loader.context"

export type HomeHeaderProps = {
  currentUserId: string
}

const HomeHeader = (props: HomeHeaderProps) => {

  const [currentUser, setCurrentUser] = useState<User|undefined>()
  const loader = useLoader()

  const navigation = useNavigation()

  const fetchUser = async() => {
    const user = await Auth.currentAuthenticatedUser()
    const res = await DataStore.query(User, user?.attributes?.sub)
    setCurrentUser(res)
  }

  useEffect(() => {
    fetchUser()

    const subscription = DataStore.observe(User, currentUser?.id).subscribe(msg => {
      if (msg.model === User && msg.opType === "UPDATE") {
        setCurrentUser(msg.element)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async() => {
    try {
      await DataStore.clear()
      await Auth.signOut()
      loader.dismissLoader()
      navigation.dispatch(
        StackActions.replace("SignIn")
      )
    } catch (error) {
      console.error(error)
    }
  }

  console.log(currentUser)


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {currentUser
          ? <FastImage
            style={styles.image}
            source={{ uri: currentUser?.imageUri }}/>
          : <ActivityIndicator color={Colors.mainPurple} />}
      </View>
      <Text style={styles.text}>DAAC</Text>
      <TouchableOpacity
        onPress={ () => {
          loader.setLoaderVisible(true)
          signOut()
        }}>
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
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.lightPurple,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 40,
    height: 40,
    // borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
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
