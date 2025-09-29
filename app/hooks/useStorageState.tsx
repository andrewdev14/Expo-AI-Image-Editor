import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const storage = {
  get: async (key: string) => {
    try {
      if (Platform.OS === "web") return localStorage.getItem(key);

      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Storage is unavailable", error);

      return null;
    }
  },

  set: async (key: string, value: string | null) => {
    try {
      if (Platform.OS === "web")
        // eslint-disable-next-line no-unused-expressions
        value === null
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, value);
      else {
        // eslint-disable-next-line no-unused-expressions
        value === null
          ? await SecureStore.deleteItemAsync(key)
          : await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error("Storage is unavailable", error);
    }
  },
};

type StorageState = [[boolean, string | null], (value: string | null) => void];

export function useStorageState(key: string): StorageState {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    storage.get(key).then((value) => {
      setValue(value);
      setIsLoading(false);
    });
  }, [key]);

  const updateValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue);
      storage.set(key, newValue);
    },
    [key]
  );

  return [[isLoading, value], updateValue];
}
