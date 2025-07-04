import * as SecureStore from "expo-secure-store";

export async function saveToLocalStorage(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getLocalStorageValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);

  return result ?? null;
}

export async function deleteToLocalStorage(key: string) {
  await SecureStore.deleteItemAsync(key);
}
