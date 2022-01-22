import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen"
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/SignUpScreen"
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"
import ChatRoomScreen from "../screens/ChatRoomScreen"
import ContactsScreen from "../screens/ContactsScreen"
import HomeHeader from "../components/headers/HomeHeader"
import ChatRoomHeader from "../components/headers/ChatRoomHeader"
import Colors from "../constants/Color"
import { Auth, Hub, DataStore } from "aws-amplify"
import { Message } from "src/models"
import RNBootSplash from "react-native-bootsplash"
import { useLoader } from "src/loader/loader.context"
import AppLoader from "src/components/AppLoader"

export type NavProps = {
  colorScheme: "light" | "dark"
}

const Stack = createNativeStackNavigator()

const Navigation = (props: NavProps) => {
  const { colorScheme } = props
  const [user, setUser] = useState(undefined)
  const loader = useLoader()

  const checkUser = async() => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
      setUser(authUser)
    } catch (e) {
      setUser(null)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    const listener = async data => {
      if (data.payload.event === "signIn") {
        console.log("AUTH EVENT - SIGN IN")
        checkUser()
        loader.dismissLoader()
      }

      if (data.payload.event === "signOut") {
        console.log("AUTH EVENT - SIGN OUT")
        await DataStore.clear()
        checkUser()
        loader.dismissLoader()
      }
    }

    Hub.listen("auth", listener)
    return () => Hub.remove("auth", listener)
  }, [])

  useEffect(() => {
    const listener = Hub.listen("datastore", async(hubData) => {
      const { payload: { event, data } } = hubData

      console.log("DataStore event:::::::::::::::::::::::::::: ", event, data)

      if (
        event === "outboxMutationProcessed" &&
        data.model === Message &&
        !["DELIVERED", "READ"].includes(data.element.status)
      ) {
        // set the message status to delivered
        DataStore.save(
          Message.copyOf(data.element, (updated) => {
            updated.status = "DELIVERED"
          })
        )
      }

      if (event === "ready") {
        console.log(
          "I am ready as hell ---------------------------------------"
        )

      }
    })

    return () => listener()
  }, [])

  if (user === undefined) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.mainPurple
            },
            headerTintColor: "#fff"
          }}
        >
          {user ? (<>
            <Stack.Screen
              name="Home"
              options={() => ({
                header: () => (<HomeHeader />)
              })}
            >
              {() => <HomeScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="Contacts"
              component={ContactsScreen}
              options={{
                title: "Contatti"
              }}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoomScreen}
              options={({ route }) => ({
                headerTitle: () => (<ChatRoomHeader name={route?.params?.name} image={route?.params?.image} />)
              })}
            />
          </>) : (<>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
          </>)}
        </Stack.Navigator>
      </NavigationContainer>
      {loader.visible ? <AppLoader /> : null}
    </View>
  )

}

export default Navigation


