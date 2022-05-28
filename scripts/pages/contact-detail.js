import { input } from "../components/input.js"
import { createContact } from "../services/contact-services.js"
import HomePage from "./homepage.js"
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";


function render() {
  let id = STORE.contactId
  let contact = STORE.showContact(id)
  console.log(contact)
  if (!id)  throw new Error("not valid Id Contact")
  return `
    <header class="header">
      <h1 class="header__title">Contact Detail</h1>
      <a href="#" class="button__link">Logout</a>
    </header> 
    
    <main class="container__contacts">
        <div class="contact__info">
          <img class="contact__avatar" src="images/person.svg" alt="icon-avatar">
          <p class="contact__name">${contact.name}</p>
          <p class="contact__relation">${contact.relation}</p>
        </div>
        <div class="contact__detail">
          <p class="contact__text">Numbers: <span class="text">${contact.number}</span></p>
          <p class="contact__text">Email: <span class="text">${contact.email}</span></p>
        </div>


        <div>
          <button class="back-btn">Back</button>
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
        </div>
    </main>
  `
}


function listenBackButton() {
  const button = document.querySelector(".back-btn")
  
  button.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(HomePage)
  })
}




const contactDetail = {
  toString() {
    return render()
  },
  addListeners() {
    listenBackButton()

  }
}

export default contactDetail