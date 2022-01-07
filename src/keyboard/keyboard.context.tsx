import React from "react"

type KeyboardType = "TEXT" | "IMAGE";

interface I_Keyboard {
    visible: boolean,
    type: KeyboardType,
    setKeyboardVisible(v: boolean, t: string): void,
    dismissKeyboard(): void
}

const initialState: I_Keyboard = {
  visible: false,
  type: "TEXT",
  setKeyboardVisible: () => {},
  dismissKeyboard: () => {}
}

export const KeyboardContext = React.createContext(initialState)

export const KeyboardContextProvider = ({ children }: any) => {

  const [visible, setVisible] = React.useState(false)
  const [type, setType] = React.useState<KeyboardType>("TEXT")

  const setKeyboardVisible = (visible: boolean, type: KeyboardType) => {
    setVisible(visible)
    setType(type)
  }

  const dismissKeyboard = () => {
    setVisible(false)
  }

  return (
    <KeyboardContext.Provider value={{
      visible,
      type,
      setKeyboardVisible,
      dismissKeyboard
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}

export const useKeyboard = () => React.useContext(KeyboardContext)