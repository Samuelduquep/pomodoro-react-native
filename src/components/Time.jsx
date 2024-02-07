import { View, Text, StyleSheet } from "react-native";

const Time = ({ time }) => {
    
  const formatTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;



  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  time: {
    fontSize: 100,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default Time;
