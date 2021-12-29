export type CustomButtonParamList = {
  buttonText: string,
  onPress: undefined,
  type: string | undefined
}

export type CustomInputParamList = {
  placeholder: string,
  value: string,
  setValue: undefined,
  secureTextEntry: boolean
}

export type User = {
  id: string,
  name: string,
  imageUri: string
}

export type Message = {
  id: string,
  content: string,
  urls: [string],
  createdAt: string,
  user: User
}

export type ChatRoom = {
  id: string,
  users: User[],
  lastMessage: Message
}

export type StandardMessage = {
  id: string,
  content: string,
  urls: [string]
}
