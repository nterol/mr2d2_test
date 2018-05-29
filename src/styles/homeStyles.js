import { StyleSheet, Dimensions } from "react-native";

export const homeStyles = StyleSheet.create({
  formerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  triangle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: Dimensions.get("window").width,
    borderRightWidth: 0,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff"
  },
  img: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2
  }
});
