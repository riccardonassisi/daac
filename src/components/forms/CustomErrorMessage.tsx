import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const CustomErrorMessage = ({ value }) => {
  if (value ===  "") {
    return null
  } else {
    return (
      <View style={styles.container}>
        <FontAwesome5
          name="times"
          size={15}
          color={"red"}
        />
        <Text style={styles.text}>{value}</Text>
      </View>
    )
  }
}

export default CustomErrorMessage

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    color: "red",
    paddingLeft: 5
  }
})
