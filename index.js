import DOMHandler from "./scripts/dom-handler.js";
// import HomePage from "./scripts/pages/home-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import { tokenKey } from "./scripts/config.js";
import STORE from "./scripts/store.js";

async function init() {
  try{
    const token = sessionStorage.getItem(tokenKey)
  
    if(!token) throw new Error()

    await STORE.filterContacts();
    
    DOMHandler.load(HomePage)
  } catch(error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage)
  }
}

init();