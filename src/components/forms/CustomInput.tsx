import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { CustomInputParamList } from "../../../types"

const CustomInput = React.forwardRef(({ value, setValue, placeholder, secureTextEntry, onSubmit }: CustomInputParamList, ref: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        onSubmitEditing={onSubmit ? onSubmit : undefined}
        onEndEditing={() => {}}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10
  },
  input: {

  }
})

export default CustomInput
