import { useState, createContext, FunctionComponent, ReactNode } from "react";

export type DarkModeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

};

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: () => { },
});

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider: FunctionComponent<DarkModeProviderProps> = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeStates = { darkMode, setDarkMode };

  return (
    <DarkModeContext.Provider value={darkModeStates}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
