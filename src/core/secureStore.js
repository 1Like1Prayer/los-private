import * as SecureStore from 'expo-secure-store';

export async function setValue(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValue(key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteValue(key) {
  return await SecureStore.deleteItemAsync(key);
}
