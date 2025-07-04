import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import getLocalNotificationReads from "../../../services/getLocalNotificationReads";

export default function useNotificationReads() {
  const [reads, setReads] = useState<string[]>([]);

  const getReads = async () => {
    const notificationReads = await getLocalNotificationReads();

    if (notificationReads !== null) {
      setReads(Object.keys(notificationReads));
    }
  };

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      getReads();
    }, [])
  );

  return { reads, getReads };
}
