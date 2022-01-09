import React, { useState } from "react"
import { View, Keyboard, Platform, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "@constants/Color"
import caaLogo from "@pictograms/CAA.png"

import { API, graphqlOperation } from "aws-amplify"

import { createMessage, updateChatRoom } from "../graphql/mutations"

import { useKeyboard } from "../keyboard/keyboard.context"
import FastImage from "react-native-fast-image"

export type InputBoxProps = {
  currentUserId: string,
  chatRoomId: string
}

const InputBox = (props: InputBoxProps) => {

  const { currentUserId, chatRoomId } = props

  const [message, setMessage] = useState("")
  const [urls, setUrls] = useState([])

  const caaKeyboard = useKeyboard()

  const onShowPictoKeyboard = () => {
    caaKeyboard.setKeyboardVisible(true, "AAC")
  }


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
        if (json[0]) {
          res.push(`https://api.arasaac.org/api/pictograms/${json[0]._id}?download=false`)
        } else {
          res.push("https://api.arasaac.org/api/pictograms/3418?download=false")
        }
      }
      setUrls(res)
    }
  }

  const updateLastMessage = async(chatId: string, messageId: string) => {
    try {
      await API.graphql(
        graphqlOperation(
          updateChatRoom, {
            input: {
              id: chatId,
              chatRoomLastMessageId: messageId
            }
          }
        )
      )
    } catch (error) {
    }
  }

  const onSendPress = async() => {
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              urls,
              messageUserId: currentUserId,
              chatRoomMessagesId: chatRoomId
            }
          }
        )
      )
      await updateLastMessage(chatRoomId, newMessageData?.data?.createMessage?.id)
    } catch (error) {
    }
  }

  const onPress = () => {
    if (message) {
      onSendPress()
      setMessage("")
      setUrls([])
      Keyboard.dismiss()
    }
  }

  return (
    <View
      style={
        Platform.OS === "ios" ?
          styles.containerIOS :
          styles.containerAndroid
      }>
      <TouchableOpacity onPress={onShowPictoKeyboard}>
        <View style={styles.caaContainer}>
          <FastImage source={caaLogo} style={styles.caaIcon} />
        </View>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={styles.preview}>
          <FlatList
            data={urls}
            renderItem={({ item }) => <FastImage
              style={styles.image}
              source={{ uri: item }}
            />}
            horizontal={true} />
        </View>
        <TextInput
          placeholder="Scrivi un messaggio..."
          multiline
          value={message}
          keyboardType="visible-password" // workaround per gli hints
          onChangeText={(message) => {
            setMessage(message)
            setNewUrls(message)
          }}
        />
      </View>

      <TouchableOpacity onPress={() => {
        onPress()
      }}>
        <View style={styles.buttonContainer}>
          <FontAwesome5 name="paper-plane" size={25} color={"white"} />
        </View>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  containerAndroid: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.lightPurple
  },
  containerIOS: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: Colors.lightPurple
  },
  mainContainer: {
    backgroundColor: "white",
    borderColor: Colors.mainPurple,
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 8,
    paddingTop: 8,
    marginHorizontal: 5,
    borderRadius: 25,
    flex: 1,
    flexDirection: "column"
  },
  preview: {
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
