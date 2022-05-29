import { input } from "../components/input.js"
import { editContact } from "../services/contact-services.js"
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import contactDetail from "./contact-detail.js";

function render() {
  const contact = STORE.showContact(STORE.contactId)
  return `
    <header  class="header">
      <h1 class="header__title">Edit contact</h1>
      <a href="#" class="button__link">Logout</a>
    </header>
    <main  class="session-container">
      <form class="js-edit-contact-form session__form">
        <div class="form__input-container">
          ${input({
            label: "name",
            id: "name",
            type: "name",
            placeholder: "Name",
            required: true,
            value: contact.name
          })}
        
          ${input({
            label: "number",
            id: "number",
            type: "number",
            placeholder: "Number",
            required: true,
            value: contact.number
          })}
       
          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            required: true,
            value: contact.email
          })}
       
          <select class="select-margin select__input" name="relation">
            <option value="Family" ${contact.relation=="Family" ? "selected" : ""}>Family</option>
            <option value="Friends" ${contact.relation=="Friends" ? "selected" : ""}>Friends</option>
            <option value="Work" ${contact.relation=="Work" ? "selected" : ""}>Work</option>
            <option value="Acquaintance" ${contact.relation=="Acquaintance" ? "selected" : ""}>Acquaintance</option>
          </select>
        </div>
        <div class="session__buttons">
            <hr class="hr">
            <a href="#" class="button__link cancel">Cancel</a>
            <button class="button__link" type="submit">Save</button>
          </div>
      </form>
    </main>
  `
}

function listenCancelButton() {
  const button = document.querySelector(".cancel");

  button.addEventListener("click", event => {
    event.preventDefault();

    DOMHandler.load(contactDetail);
  })
}

function listenSubmitForm() {
  const form = document.querySelector(".js-edit-contact-form")

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { name, number, email, relation } = event.target

    const editedContact = {
      name: name.value,
      number: number.value,
      email: email.value,
      relation: relation.value
    }
    await editContact(STORE.contactId, editedContact)
    await STORE.filterContacts();
    DOMHandler.load(contactDetail)
  })
}

const editContactPage = {
  toString() {
    return render()
  },
  addListeners() {
    listenSubmitForm(),
    listenCancelButton()
  }
}

export default editContactPage