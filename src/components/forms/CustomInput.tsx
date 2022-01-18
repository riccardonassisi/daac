import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import Colors from "src/constants/Color"
import useColorScheme from "src/hooks/useColorScheme"
import { CustomInputParamList } from "../../../types"

const CustomInput = React.forwardRef(({ value, setValue, placeholder, secureTextEntry, onSubmit }: CustomInputParamList, ref: any) => {

  const colorScheme = useColorScheme()

  return (
    <View style={styles[`${colorScheme}_container`]}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        autoCapitalize="none"
        style={styles[`${colorScheme}_input`]}
        onSubmitEditing={onSubmit ? onSubmit : undefined}
        onEndEditing={() => {}}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  light_container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: Colors.lightPurple,
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10
  },
  dark_container: {
    backgroundColor: "transparent",
    width: "100%",

    borderColor: Colors.lightPurple,
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10
  },
  light_input: {
  },
  dark_input: {
  }
})

export default CustomInput
