import STORE from "./../store.js";
import DOMHandler from "../dom-handler.js";
import NewContactPage from "./new-contact-page.js"
import contactDetail from "./contact-detail.js"
import { logout } from "../services/sessions-service.js";
import LoginPage from "./login-page.js";

function renderContacts(contact) {
  return `
  <li class="list__element">
    <div class="contacts__info" >
      <img class="info__avatar" src="/images/person.svg" data-id="${contact.id}" alt="contact-avatar">
      <p class="info__name" data-id="${contact.id}">${contact.name}</p>
    </div>
    <img src="/images/star.svg" class="contacts__favorite" data-tab="favoriteContact">


  </li>
  `
}

function render() {
  return `
    <main>
      <header class="header"> 
        <div>
          <h1 class="header__title">Contactable</h1>
          <p>Contacts(${STORE.contacts.length})</p>
        </div>
        <a href="#" class="button__link logout">Logout</a>


      </header>
      <div>
        <div>

          <ul class="js-contacts-list contacts__list session-container">
            ${STORE.contacts.map(renderContacts).join("")}
          </ul>
        </div>
      </div>
      <a class="container__buttonAdd" href="#">
        <img class="buttonAdd" src="images/add.svg" alt="add-icon">
      </a>
    </main>

  `
}

function addButtonListener(){
  const button = document.querySelector(".container__buttonAdd")
  button.addEventListener("click",(event)=>{
    event.preventDefault()
    DOMHandler.load(NewContactPage)
  })
}

// contact--img linea 7
function showContactListener(){
  const ul = document.querySelector(".js-contacts-list")
  ul.addEventListener("click",(event)=>{
    event.preventDefault()
    const {id}=event.target.dataset
    if(!id) return;
    STORE.contactId = id
    DOMHandler.load(contactDetail)
  })
}

function listenLogout() {
  const button = document.querySelector(".logout");

  button.addEventListener("click", async event => {
    event.preventDefault();
    await logout();

    DOMHandler.load(LoginPage);
  })
}


const HomePage = {
  toString() {
    return render()
  },
  addListeners() {
    addButtonListener(),
    showContactListener(),
    listenLogout()

  }
}

export default HomePage

