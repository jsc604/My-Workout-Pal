import { useState, createContext, FunctionComponent, ReactNode } from "react";

export type StopwatchContextType = {
  time: number;
  setTime: (time: number) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
};

export const stopwatchContext = createContext<StopwatchContextType>({
  time: 0,
  setTime: () => {},
  isRunning: false,
  setIsRunning: () => {},
});

interface StopwatchProviderProps {
  children: ReactNode;
}

const StopwatchProvider: FunctionComponent<StopwatchProviderProps> = (props) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stopwatchStates = { time, setTime, isRunning, setIsRunning };

  return (
    <stopwatchContext.Provider value={stopwatchStates}>
      {props.children}
    </stopwatchContext.Provider>
  );
};

export default StopwatchProvider;
