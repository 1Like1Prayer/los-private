import { deleteValue, getValue, setValue } from './secureStore';

export const TOKEN_KEY = 'access_token';
export const USER_KEY = 'user_token';

export async function getToken() {
    try {
        return await getValue(TOKEN_KEY);
    } catch (error) {
        return null
    }
}

export async function setToken(idToken) {
    if (idToken.length) {
        return await setValue(TOKEN_KEY, idToken);
    }
}

export async function deleteToken() {
    return await deleteValue(TOKEN_KEY);
}

export async function getUser() {
    try {
        return JSON.parse(await getValue(USER_KEY));
    } catch (error) {
        return null;
    }
}

export async function setUser(data) {
    return await setValue(USER_KEY, JSON.stringify(data));
}

export async function deleteUser() {
    return await deleteValue(USER_KEY);
}