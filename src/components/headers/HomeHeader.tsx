import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Colors from "../../constants/Color"

import { Auth, DataStore, Hub } from "aws-amplify"
import FastImage from "react-native-fast-image"
import { User } from "src/models"
import { useLoader } from "src/loader/loader.context"

export type HomeHeaderProps = {
  currentUserId: string
}

const HomeHeader = () => {

  const [currentUser, setCurrentUser] = useState<User|undefined>()
  const loader = useLoader()

  const fetchUser = async() => {
    const user = await Auth.currentAuthenticatedUser()
    const res = await DataStore.query(User, user?.attributes?.sub)
    setCurrentUser(res)
  }

  useEffect(() => {
    const listener = Hub.listen("datastore", async(hubData) => {
      const { payload: { event, data } } = hubData
      if (event === "ready") {
        fetchUser()
      }
    })
    return () => listener()
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])

  const signOut = async() => {
    try {
      await DataStore.clear()
      await Auth.signOut()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{ uri: currentUser?.imageUri }}/>
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
