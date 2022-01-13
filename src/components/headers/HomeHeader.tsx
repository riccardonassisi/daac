import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Colors from "../../constants/Color"

import { API, Auth, graphqlOperation } from "aws-amplify"
import { getUserInfo } from "../../graphql/customQueries"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import FastImage from "react-native-fast-image"

export type HomeHeaderProps = {
  currentUserId: string
}

const HomeHeader = (props: HomeHeaderProps) => {

  const [currentUser, setCurrentUser] = useState()
  const navigation = useNavigation()

  const { currentUserId } = props

  // if (!currentUserId) {
  //   const route = useRoute()
  //   currentUserId = route?.params?.currentUserId
  // }

  useEffect(() => {
    const fetchMyData = async() => {
      try {
        const myData = await API.graphql(
          graphqlOperation(
            getUserInfo, {
              id: currentUserId
            }
          )
        )
        setCurrentUser(myData?.data?.getUser)
      } catch (error) {
      }
    }
    fetchMyData()
  }, [])

  async function signOut() {
    try {
      await Auth.signOut()
      navigation.dispatch(
        StackActions.replace("SignIn")
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{ uri: currentUser?.imageUri }}/>
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
