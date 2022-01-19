import React from "react"

interface I_Loader {
    visible: boolean,
    setLoaderVisible(v: boolean): void,
    dismissLoader(): void
}

const initialState: I_Loader = {
  visible: false,
  setLoaderVisible: () => {},
  dismissLoader: () => {}
}

export const LoaderContext = React.createContext(initialState)

export const LoaderContextProvider = ({ children }: any) => {

  const [visible, setVisible] = React.useState(false)

  const setLoaderVisible = (visible: boolean) => {
    setVisible(visible)
  }

  const dismissLoader = () => {
    setVisible(false)
  }

  return (
    <LoaderContext.Provider value={{
      visible,
      setLoaderVisible,
      dismissLoader
    }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => React.useContext(LoaderContext)
