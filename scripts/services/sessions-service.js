import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"
// import STORE from "./../store.js"

export async function login(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("login", { body: credentials })
  sessionStorage.setItem(tokenKey, token)
  // STORE.user = user;
  return user;
}


export async function logout(){
  const data = await apiFetch("logout", { method: "DELETE" })
  sessionStorage.removeItem(tokenKey)
  return data
}