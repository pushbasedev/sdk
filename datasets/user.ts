import { Platform } from "react-native";

const androidUser = {
  name: "George Washington",
  email: "washington@wh.gov",
};

const iOSUser = {
  name: "John Adams ",
  email: "adams@wh.gov",
};

const user = Platform.select({ android: androidUser, ios: iOSUser });

export default user;
