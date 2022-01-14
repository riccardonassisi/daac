import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "src/constants/Color"
import caaLogo from "@pictograms/CAA.png"
import bodyList from "@data/bodylist"

import CaaKeyboardComponent from "./CaaKeyboardComponent"

import { useKeyboard } from "../../keyboard/keyboard.context"
import { InputBoxProps } from "../InputBox"

import { DataStore } from "aws-amplify"
import { ChatRoom, Message } from "src/models"

const CaaKeyboard = (props: InputBoxProps) => {
  const { currentUserId, chatRoom } = props

  const [message, setMessage] = useState<string>("")
  const [urls, setUrls] = useState<string[]>([])

  const [body, setBody] = useState(bodyList.mainbody)
  const caaKeyboard = useKeyboard()

  const onHideCaaKeyboard = () => {
    caaKeyboard.dismissKeyboard()
  }

  const addPicto = (text: string, uri: string) => {
    if (message === "") {
      setMessage(text)
    } else {
      const newmsg = `${message} ${text}`
      setMessage(newmsg)
    }
    const newuris = urls
    newuris.push(uri)
    setUrls(newuris)
  }

  const removePicto = () => {
    const newmsg = message.substring(0, message.lastIndexOf(" "))
    setMessage(newmsg)
    const newuris = urls
    newuris.pop()
    setUrls(newuris)
  }

  const clearPicto = () => {
    setMessage("")
    const r: [] = urls.splice(0, urls.length)
    setUrls(r)
  }

  const showInitialBody = () => {
    setBody(bodyList.mainbody)
  }

  const showSecondaryBody = (name: string) => {
    if (bodyList[`${name}`]) {
      setBody(bodyList[`${name}`])
    }
  }

  const updateLastMessage = async(newMessage: Message) => {
    DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
      updatedChatRoom.LastMessage = newMessage
    }))
  }

  const onSendPress = async() => {
    const newMessage = await DataStore.save(new Message({
      content: message,
      urls,
      userID: currentUserId,
      chatroomID: chatRoom.id
    }))

    updateLastMessage(newMessage)
  }

  const onPress = async() => {
    if (message) {
      await onSendPress()
      clearPicto()
      caaKeyboard.dismissKeyboard()
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={onHideCaaKeyboard}>
          <View style={styles.caaContainer}>
            <FastImage source={caaLogo} style={styles.caaIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.preview}>
          <Text style={styles.previewText}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            <FontAwesome5 name="paper-plane" size={25} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.mainRow}>
        <CaaKeyboardComponent
          text="Inizio"
          uri="_inizio"
          onPress={() => {
            showInitialBody()
          }}
          type="MAIN"
        />
        <CaaKeyboardComponent
          text="SI"
          uri="_si"
          onPress={() => {
            addPicto("si", "_si")
          }}
          type="MAIN"
        />
        <CaaKeyboardComponent
          text="NO"
          uri="_no"
          onPress={() => {
            addPicto("no", "_no")
          }}
          type="MAIN"
        />
        <CaaKeyboardComponent
          text="Cancella"
          uri="_cancella"
          onPress={() => {
            removePicto()
          }}
          type="MAIN"
        />
        <CaaKeyboardComponent
          text="Pulisci"
          uri="_pulisci"
          onPress={() => {
            clearPicto()
          }}
          type="MAIN"
        />
      </View>

      <View style={styles.body}>

        {body.map((picto) => (
          <CaaKeyboardComponent
            text={picto.text}
            uri={picto.uri}
            onPress={() => {
              if (picto.type === "SINGLE") {
                addPicto(picto.text, picto.uri)
              } else {
                showSecondaryBody(picto.text)
              }
            }}
            type={picto.type}
          />
        ))
        }
      </View>

    </View>
  )
}

export default CaaKeyboard

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    display: "flex"
  },
  body: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainRow: {
    flex: 1,
    flexDirection: "row"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: Colors.lightPurple
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
  preview: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    borderColor: Colors.mainPurple,
    borderWidth: 1,
    borderRadius: 15
  },
  previewText: {
    color: "black"
  }

})

