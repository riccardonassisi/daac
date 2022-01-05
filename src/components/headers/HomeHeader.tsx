import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Colors from "../../constants/Color"

import { API, Auth, graphqlOperation } from "aws-amplify"
import { getUserInfo } from "../../graphql/customQueries"


const HomeHeader = () => {

  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const fetchMyData = async() => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        const myData = await API.graphql(
          graphqlOperation(
            getUserInfo, {
              id: userInfo.attributes.sub
            }
          )
        )
        setCurrentUser(myData.data.getUser)
      } catch (error) {
      }
    }
    fetchMyData()
  })

  async function signOut() {
    try {
      await Auth.signOut()
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: currentUser?.imageUri }}/>
      <Text style={styles.text}>DAAC</Text>
      <Pressable onPress={ () => signOut() }>
        <FontAwesome5
          name="sign-out-alt"
          size={20}
          color={"#fff"}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.mainPurple,
    paddingLeft: 10
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
    fontWeight: "bold"
  }
})

export default HomeHeader
