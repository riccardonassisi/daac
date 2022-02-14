import React, { useState } from "react"
import { View, Keyboard, Platform, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "@constants/Color"
import caaLogo from "@pictograms/cose/caa.png"

import { DataStore } from "aws-amplify"

import { useKeyboard } from "../keyboard/keyboard.context"
import FastImage from "react-native-fast-image"
import Pictograms from "../../data/pictogramspath"
import { ChatRoom, Message } from "src/models"
import { findThePicto, findThePictoDummy, findThePictoRecursive, max_in_picto } from "src/utils/util"

export type InputBoxProps = {
  currentUserId: string,
  chatRoom: ChatRoom
}

const InputBox = (props: InputBoxProps) => {

  const { currentUserId, chatRoom } = props

  const [message, setMessage] = useState("")
  const [urls, setUrls] = useState<string[]>([])

  const caaKeyboard = useKeyboard()

  const onShowPictoKeyboard = () => {
    caaKeyboard.setKeyboardVisible(true, "AAC")
  }

  const algorithmZero = async(msg: string)  => {
    if (msg === "") {
      setUrls([])
    } else {
      const res = await findThePictoDummy(msg)
      setUrls(res)
    }
  }

  const algorithmOne = (msg: string) => {
    if (msg === "") {
      setUrls([])
    } else {
      const res = findThePicto(msg.replace(/[^a-zA-Z0-9 ?]/g, "").toLowerCase())
      setUrls(res)
    }
  }

  const algorithmTwo = (msg: string) => {
    if (msg === "") {
      setUrls([])
    } else {
      const cleaned = msg.replace(/[^a-zA-Z0-9 ?]/g, "").toLowerCase()
      const res = findThePictoRecursive(cleaned, cleaned.split(" ").length, max_in_picto).split("+")
      setUrls(res)
    }
  }


  const updateLastMessage = async(newMessage: Message) => {
    await DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
      updatedChatRoom.LastMessage = newMessage
      updatedChatRoom.newMessages++
    }))
  }

  const onSendPress = async() => {
    const newMessage = await DataStore.save(new Message({
      content: message,
      urls,
      userID: currentUserId,
      chatroomID: chatRoom.id,
      status: "SENT"
    }))

    updateLastMessage(newMessage)
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset = {Platform.OS === "ios" ? 100 : 0}>
      <TouchableOpacity onPress={onShowPictoKeyboard}>
        <View style={styles.caaContainer}>
          <FastImage source={caaLogo} style={styles.caaIcon} />
        </View>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={styles.preview}>
          <FlatList
            data={urls}
            renderItem={({ item }) => {
              if (item[0] === "_") {
                return (<FastImage
                  style={styles.image}
                  source={Pictograms[item]}
                />)
              } else {
                return (<FastImage
                  style={styles.image}
                  source={{ uri: item }}
                />)
              }
            }}
            horizontal={true} />
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Scrivi un messaggio..."
          placeholderTextColor={"grey"}
          multiline
          value={message}
          onChangeText={(message) => {
            setMessage(message)
            algorithmOne(message)
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

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.lightPurple
  },
  mainContainer: {
    backgroundColor: "white",
    borderColor: Colors.mainPurple,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 8,
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
  },
  textinput: {
    color: "#000"
  }
})

export default InputBox
