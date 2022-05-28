import STORE from "./../store.js";
import DOMHandler from "../dom-handler.js";
import NewContactPage from "./new-contact-page.js"
import contactDetail from "./contact-detail.js"

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
        <a href="#" class="button__link">Logout</a>


      </header>
      <div>
        <div>

          <ul class="js-contacts-list contacts__list session-container">
            ${STORE.contacts.map(renderContacts).join("")}
          </ul>
        </div>
      </div>
      <footer>
      <a class="footer--button__add" href="#">
        <img src="/images/add.svg" data-tab="addBtn">
      </a>
      </footer>
    </main>

  `
}

function addButtonListener(){
  const button = document.querySelector(".footer--button__add")
  button.addEventListener("click",(event)=>{
    event.preventDefault()
    const {tab}=event.target.dataset
    if(!tab) return;
    STORE.currenTab = tab;
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


const HomePage = {
  toString() {
    return render()
  },
  addListeners() {
    addButtonListener(),
    showContactListener()

  }
}

export default HomePage

