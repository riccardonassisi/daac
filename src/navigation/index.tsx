import React, { useEffect } from "react"
import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
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
import { DataStore, Hub } from "aws-amplify"
import { Message } from "src/models"

export type NavProps = {
  currentUserId: string,
  isLoggedIn: boolean
}

const Stack = createNativeStackNavigator()

const Navigation = (props: NavProps) => {

  const { currentUserId, isLoggedIn } = props

  useEffect(() => {
    const listener = Hub.listen("datastore", async hubData => {
      const { event, data } = hubData.payload
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
    })

    DataStore.start()

    return () => {
      listener()
    }

  }, [])

  return (

    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Home" : "SignIn"}
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.mainPurple
            },
            headerTintColor: "#fff"
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen
            name="Home"
            options={({ route }) => ({
              header: () => (<HomeHeader currentUserId={currentUserId ? currentUserId : route?.params?.currentUserId}/>)
            })}
          >
            {() => <HomeScreen currentUserId={currentUserId}/>}
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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

}

export default Navigation


