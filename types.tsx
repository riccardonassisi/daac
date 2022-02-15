export type CustomButtonParamList = {
  buttonText: string,
  onPress(a: any): void,
  type: string | undefined
}

export type CustomInputParamList = {
  placeholder: string,
  value: string,
  setValue(s: string): void,
  secureTextEntry: boolean,
  onSubmit?(a: any): void
}

export type CaaKeyboardComponentParamList = {
  text: string,
  uri: string,
  onPress(a: any): void,
  type: string
}

export type User = {
  id: string,
  name: string,
  imageUri: string
}

export type Message = {
  id: string,
  content: string,
  urls: string[],
  createdAt: string,
  user: User
}

export type ChatRoom = {
  id: string,
  users: User[],
  lastMessage: Message
}

// export type StandardMessage = {
//   id: string,
//   content: string,
//   urls: string[]
// }

export type Pictogram = {
  text: string,
  uri: string,
  type: "SINGLE" | "LINK" | "MAIN"
}
