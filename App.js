import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "./src/components/Header";
import Time from "./src/components/Time";

const colors = ["#FF9B85", "#60D394", "#FFD97D"];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setTime(currentTime === 0 ? 1500 : currentTime === 1 ? 300 : 900);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    if (isActive) {
      setTime(currentTime === 0 ? 1500 : currentTime === 1 ? 300 : 900);
      handleStartStop();
      setIsActive(false);
    }
  }, [currentTime]);

  const handleStartStop = () => {
    clickAudio();
    setIsActive(!isActive);
  };

  async function clickAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );

    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Time time={time} />
        <TouchableOpacity style={styles.button}>
          <Text
            onPress={handleStartStop}
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333",
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
  },
});
