import { input } from "../components/input.js"
import { createContact, deleteContact } from "../services/contact-services.js"
import HomePage from "./homepage.js"
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import editContactPage from "./edit-contact.js"


function render() {
  let id = STORE.contactId
  let contact = STORE.showContact(id)
  if (!id)  throw new Error("not valid Id Contact")
  return `
    <header class="header">
      <h1 class="header__title">Contact Detail</h1>
      <a href="#" class="button__link">Logout</a>
    </header> 
    
    <main class="container-contact">
        <div class="contact__info">
          <img class="contact__avatar" src="images/person.svg" alt="icon-avatar">
          <p class="contact__name">${contact.name}</p>
          <p class="contact__relation">${contact.relation}</p>
        </div>
        <div class="contact__detail">
          <p class="contact__text">Numbers: <span class="text">${contact.number}</span></p>
          <p class="contact__text">Email: <span class="text">${contact.email}</span></p>
        </div>

        <div class="session-buttons contact__buttons">
          <hr class="hr">
          <a href="#" class="button__link back-btn">Back</a>
          <a href="#" class="button__link delete-btn" data-id="${contact.id}">Delete</a>
          <a href="#" class="button__link edit-btn" data-id="${contact.id}">Edit</a>
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

function listenDeleteButton() {
  const button = document.querySelector(".delete-btn")

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data-id")
    
    await deleteContact(id)
    await STORE.filterContacts()
    DOMHandler.load(HomePage)
    
  })
}

function listenEditButton() {
  const button = document.querySelector(".edit-btn")
  
  button.addEventListener("click", (event) => {
    event.preventDefault();
    
    const id = event.target.getAttribute("data-id")
    
    STORE.contactId = id
    
    DOMHandler.load(editContactPage)

})
}

const contactDetail = {
  toString() {
    return render()
  },
  addListeners() {
    listenBackButton(),
    listenDeleteButton(),
    listenEditButton()
  }
}

export default contactDetail