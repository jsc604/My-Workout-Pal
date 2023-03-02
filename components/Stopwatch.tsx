import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "./colors";

type StopwatchProps = {
  startTime?: number;
};

const Stopwatch: React.FC<StopwatchProps> = ({ startTime = 0 }) => {
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(performance.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(startTime);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        {isRunning ? (
          <Text style={styles.button} onPress={handlePause}>
            Pause
          </Text>
        ) : (
          <Text style={styles.button} onPress={handleStart}>
            Start
          </Text>
        )}
        <Text style={styles.button} onPress={handleReset}>
          Reset
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.orange,
    padding: 10,
    margin: 8,
    borderRadius: 4,
    fontSize: 20,
  },
});

export default Stopwatch;
