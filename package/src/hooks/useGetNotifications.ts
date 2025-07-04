import { useEffect, useRef, useState, useCallback } from "react";
import { PushbaseNotification, getNotifications } from "..";

import { useIsFocused } from "@react-navigation/native";
import getLocalNotifications from "../services/getLocalNotifications";
import { isCachedNetworkDataExpired } from "../utils";
interface UseFetchResult {
  data: PushbaseNotification[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetNotifications(options?: {
  lookbackDays?: number;
}): UseFetchResult {
  const [data, setData] = useState<PushbaseNotification[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState<number>(0); // trigger refetch
  const isFocused = useIsFocused();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    const { notificationsCacheTime, notifications: cachedNotifications } =
      await getLocalNotifications();

    if (notificationsCacheTime && Array.isArray(cachedNotifications)) {
      const cacheExpired = isCachedNetworkDataExpired(notificationsCacheTime);

      if (!cacheExpired && cachedNotifications.length > 0) {
        setLoading(false);
        return setData(cachedNotifications);
      }
    }

    setLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    try {
      const notifications = await getNotifications({
        lookbackDays: options?.lookbackDays ?? 7,
      });
      setData(notifications);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [reloadIndex, fetchData, isFocused]);

  const refetch = useCallback(() => {
    setReloadIndex((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
}
