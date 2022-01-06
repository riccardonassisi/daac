import React, { useEffect, useState } from "react"
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

export type NavProps = {
  isLoggedIn: boolean
}

const Stack = createNativeStackNavigator()

const Navigation = (props: NavProps) => {

  const { isLoggedIn } = props

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName={isLoggedIn === true ? "Home" : "SignIn"}
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
          component={HomeScreen}
          options={{
            headerTitle: () => (<HomeHeader />)
          }}
        />
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
  )

}

export default Navigation


