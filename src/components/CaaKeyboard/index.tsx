import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Colors from "@constants/Color"
import caaLogo from "@pictograms/CAA.png"
import domande from "@data/domande"
import mainbody from "@data/Mainbody"

import CaaKeyboardComponent from "./CaaKeyboardComponent"

import { useKeyboard } from "../../keyboard/keyboard.context"
import { InputBoxProps } from "../InputBox"

import { Auth } from "aws-amplify"
import { API, graphqlOperation } from "aws-amplify"
import { createMessage, updateChatRoom } from "../../graphql/mutations"
import FastImage from "react-native-fast-image"

const CaaKeyboard = (props: InputBoxProps) => {
  const { chatRoomId } = props

  const [message, setMessage] = useState("")
  const [uris, setUris] = useState([])
  const [myUserID, setMyUserID] = useState("")

  const bodyList = {
    mainbody,
    domande
  }

  const [body, setBody] = useState(bodyList.mainbody)

  useEffect(() => {
    const fetchUser = async() => {
      const userInfo = await Auth.currentAuthenticatedUser()
      setMyUserID(userInfo.attributes.sub)
    }

    fetchUser()
  }, [])

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
    const newuris = uris
    newuris.push(uri)
    setUris(newuris)
  }

  const removePicto = () => {
    const newmsg = message.substring(0, message.lastIndexOf(" "))
    setMessage(newmsg)
    const newuris = uris
    newuris.pop()
    setUris(newuris)
  }

  const clearPicto = () => {
    setMessage("")
    const r: [] = uris.splice(0, uris.length)
    setUris(r)
  }

  const showInitialBody = () => {
    setBody(bodyList.mainbody)
  }

  const showSecondaryBody = (name: string) => {
    setBody(bodyList[`${name}`])
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
      console.error(error)
    }
  }

  const onSendPress = async() => {
    try {

      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              urls: uris,
              messageUserId: myUserID,
              chatRoomMessagesId: chatRoomId
            }
          }
        )
      )
      await updateLastMessage(chatRoomId, newMessageData.data.createMessage.id)
    } catch (error) {
    }
  }

  const onPress = () => {
    console.log(uris)
    if (message) {
      onSendPress()
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
        <TouchableOpacity onPress={() => {
          onPress()
        }}>
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
    backgroundColor: "transparent"
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

