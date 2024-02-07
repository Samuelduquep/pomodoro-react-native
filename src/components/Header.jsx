import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.itemsStyles,
            currentTime !== index && { borderColor: "transparent" },
          ]}
        >
          <Text
            style={styles.textItemStyles}
            onPress={() => handlePress(index)}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemsStyles: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
  textItemStyles: {
    fontSize: 17,
    fontWeight: "bold",
    padding: 10,
    color: "#333",
  },
});
