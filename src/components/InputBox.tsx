import React, { useState, useEffect } from "react"
import { View, Keyboard, Image, Platform, TextInput, FlatList, Pressable, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "../constants/Color"

import { API, graphqlOperation, Auth } from "aws-amplify"

import DefaultPictoInput from "./DefaultPictoInput"
import { createMessage, updateChatRoom } from "../graphql/mutations"

export type InputBoxProps = {
  chatRoomId: string
}

const KEYBOARD_HINTS_HEIGHT = 100

const InputBox = (props: InputBoxProps) => {

  const { chatRoomId } = props

  const [message, setMessage] = useState("")
  const [urls, setUrls] = useState([])

  const [myUserID, setMyUserID] = useState(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [defPictogramVisible, setDefPictogramVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height)
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0)
        setKeyboardVisible(false)
      }
    )

    return (): void => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  useEffect(() => {
    const fetchUser = async() => {
      const userInfo = await Auth.currentAuthenticatedUser()
      setMyUserID(userInfo.attributes.sub)
    }

    fetchUser()
  })

  const setNewUrls = async(msg: string)  => {
    if (msg === "") {
      setUrls([])
    } else {
      const wordsArray = msg.split(" ") // splits the text up in chunks
      // eslint-disable-next-line prefer-const
      let res = []
      for (const element of wordsArray) {
        const response = await fetch(`https://api.arasaac.org/api/pictograms/it/search/${element}`)
        const json = await response.json()
        res.push(`https://api.arasaac.org/api/pictograms/${json[0]._id}?download=false`)
      }
      setUrls(res)
    }
  }

  const updateLastMessage = async(messageId: string) => {
    try {
      await API.graphql(
        graphqlOperation(
          updateChatRoom, {
            input: {
              id: chatRoomId,
              chatRoomLastMessageId: messageId
            }
          }
        )
      )
    } catch (error) {
    }
  }

  const changeKeys = () => {
    setDefPictogramVisible(!defPictogramVisible)
  }

  const onSendPress = async() => {
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              urls,
              messageUserId: myUserID,
              chatRoomMessagesId: chatRoomId
            }
          }
        )
      )
      await updateLastMessage(newMessageData.data.createMessage.id)
    } catch (error) {
      console.log(error)

    }
    setMessage("")
    setUrls([])
    Keyboard.dismiss()
  }

  const onPress = () => {
    if (message) {
      onSendPress()
    }
  }

  return (
    <View
      style={[
        Platform.OS === "ios" ?
          styles.containerIOS :
          styles.containerAndroid
        ,
        Platform.OS === "ios" && isKeyboardVisible ?
          { marginBottom: KEYBOARD_HINTS_HEIGHT } : {}
      ]}>
      {defPictogramVisible
        ? (<DefaultPictoInput chatRoomId={chatRoomId}/>)
        : (
          <View style={styles.mainContainer}>
            <View style={styles.preview}>
              <FlatList
                data={urls}
                renderItem={({ item }) => <Image
                  style={styles.image}
                  source={{ uri: item }}
                />}
                horizontal={true} />
            </View>
            <TextInput
              placeholder="Type a message..."
              multiline
              value={message}
              keyboardType="visible-password" // workaround per gli hints
              onChangeText={(message) => {
                setMessage(message)
                setNewUrls(message)
              }}
            />
          </View>)}
      {!isKeyboardVisible
        ?
        <Pressable onPress={changeKeys}>
          <View style={styles.caaContainer}>
            <Image source={{ uri: "https://api.arasaac.org/api/pictograms/6991?download=false" }} style={styles.caaIcon} />
          </View>
        </Pressable>
        :
        <Pressable onPress={() => {
          onPress()
        }}>
          <View style={styles.buttonContainer}>
            <FontAwesome5 name="paper-plane" size={25} color={"white"} />
          </View>
        </Pressable>}
    </View>
  )
}

const styles = StyleSheet.create({
  containerAndroid: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  containerIOS: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  mainContainer: {
    backgroundColor: "white",
    borderColor: Colors.mainPurple,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 10,
    marginRight: 5,
    borderRadius: 25,
    flex: 1,
    flexDirection: "column"
  },
  preview: {
    backgroundColor: "White"
  },
  buttonContainer: {
    backgroundColor: Colors.mainPurple,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  caaContainer: {
    borderColor: Colors.mainPurple,
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  caaIcon: {
    height: 50,
    width: 50
  },
  image: {
    width: 50,
    height: 50
  }
})

export default InputBox
