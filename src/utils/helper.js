import * as Application from "expo-application";

export const getDeviceId = () => {
  try {
    const uniqueId = Application.getAndroidId();
    return uniqueId;
  } catch (error) {
    console.log("Error getting deviceId:c", error);
    throw error;
  }
};
