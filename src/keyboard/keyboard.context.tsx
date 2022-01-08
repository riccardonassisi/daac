import React from "react"

type KeyboardType = "TEXT" | "AAC";

interface I_Keyboard {
    visible: boolean,
    type: KeyboardType,
    setKeyboardVisible(v: boolean, t: string): void,
    dismissKeyboard(): void,
    toggleKeyboard(): void
}

const initialState: I_Keyboard = {
  visible: false,
  type: "AAC",
  setKeyboardVisible: () => {},
  dismissKeyboard: () => {},
  toggleKeyboard: () => {}
}

export const KeyboardContext = React.createContext(initialState)

export const KeyboardContextProvider = ({ children }: any) => {

  const [visible, setVisible] = React.useState(false)
  const [type, setType] = React.useState<KeyboardType>("AAC")

  const setKeyboardVisible = (visible: boolean, type: KeyboardType) => {
    setVisible(visible)
    setType(type)
  }

  const dismissKeyboard = () => {
    setVisible(false)
  }

  const toggleKeyboard = () => {
    setVisible(!visible)
  }

  return (
    <KeyboardContext.Provider value={{
      visible,
      type,
      setKeyboardVisible,
      dismissKeyboard,
      toggleKeyboard
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}

export const useKeyboard = () => React.useContext(KeyboardContext)
