import STORE from "./../store.js";
import DOMHandler from "../dom-handler.js";
import NewContactPage from "./new-contact-page.js"
import contactDetail from "./contact-detail.js"

function renderContacts(contact) {
  return `
  <li>
    <div class="contact--img" >
      <img src="/images/person.svg" data-id="${contact.id}">
      <p data-id="${contact.id}">${contact.name}</p>
    </div>
    <img src="/images/star.svg" class="contact--favorite__btn" data-tab="favoriteContact">


  </li>
  `
}

function render() {
  return `
    <main>
      <header> 
        <h1>Contactable</h1>
        <a href="#" ></a>
      </header>
      <div>
        <div>
          <p>Contacts(${STORE.contacts.length})</p>
          <ul class="js-contacts-list">
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

