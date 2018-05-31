import { StyleSheet, Dimensions } from "react-native";

export const profileStyles = StyleSheet.create({
  formerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#08afec61"
  },
  triangle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 0,
    height: 10,
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
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 2,
    marginTop: 75,
    justifyContent: "center"
  },
  highLight: {
    alignSelf: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    backgroundColor: "transparent",
    borderRadius: 75
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75
  },

  textAvatar: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  },
  displayInfo: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center"
  },
  firstName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});
