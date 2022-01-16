import React, { useState } from "react"
import { View, Keyboard, Platform, TextInput, FlatList, StyleSheet, Pressable } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "@constants/Color"
import caaLogo from "@pictograms/CAA.png"

import { API, DataStore, graphqlOperation } from "aws-amplify"

import { createMessage, updateChatRoom } from "../graphql/mutations"

import { useKeyboard } from "../keyboard/keyboard.context"
import FastImage from "react-native-fast-image"
import Pictograms from "../../data/pictogramspath"
import PictogramList from "data/pictogramslist"
import { ChatRoom, Message } from "src/models"


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

  // const setNewUrls = async(msg: string)  => {
  //   if (msg === "") {
  //     setUrls([])
  //   } else {
  //     const wordsArray = msg.split(" ") // splits the text up in chunks
  //     // eslint-disable-next-line prefer-const
  //     let res = []
  //     for (const element of wordsArray) {
  //       const response = await fetch(`https://api.arasaac.org/api/pictograms/it/search/${element}`)
  //       const json = await response.json()
  //       if (json[0]) {
  //         res.push(`https://api.arasaac.org/api/pictograms/${json[0]._id}?download=false`)
  //       } else {
  //         res.push("https://api.arasaac.org/api/pictograms/3418?download=false")
  //       }
  //     }
  //     setUrls(res)
  //   }
  // }

  const setNewUrls = (msg: string) => {
    if (msg === "") {
      setUrls([])
    } else {
      const res: string[] = []
      let main = msg.replace(/[^a-zA-Z0-9 ?]/g, "").toLowerCase()
      while (main.length > 0) {
        // copio la stringa completa in una var temporanea
        let check = main
        // itero finché la var temp non è vuota
        while (check.length > 0) {
          // per ogni elemento nel db itero e cerco una compatibilità
          PictogramList.every((item) => {
            // trovato la compatibilità
            if (item.text === check) {
              // pusho nell'array degli id quello trovato
              res.push(item.uri)
              // modifico la stringa main togliendo dall'inizio le parole che ho trovato (check)
              main = main.substring(check.length + 1, main.length)
              check = ""
              return false
            }
            // uso every invece che foreach così posso breakare una volta trovato
            return true
          })
          const index = check.lastIndexOf(" ")
          if (index === -1 && check.length > 0) {
            res.push("_undefined")
            main = main.substring(check.length + 1, main.length)
            check = ""
          } else {
            check = check.substring(0, index)
          }
        }
      }
      setUrls(res)
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
    <View
      style={
        Platform.OS === "ios" ?
          styles.containerIOS :
          styles.containerAndroid
      }>
      <Pressable onPress={onShowPictoKeyboard}>
        <View style={styles.caaContainer}>
          <FastImage source={caaLogo} style={styles.caaIcon} />
        </View>
      </Pressable>

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

      <Pressable onPress={() => {
        onPress()
      }}>
        <View style={styles.buttonContainer}>
          <FontAwesome5 name="paper-plane" size={25} color={"white"} />
        </View>
      </Pressable>

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
