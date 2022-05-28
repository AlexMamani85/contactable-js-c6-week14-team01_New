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
    <section  class="container--edit__contacts">
      <form class="js-edit-contact-form ">
        <div>
          ${input({
            label: "name",
            id: "name",
            type: "name",
            placeholder: "Name",
            required: true,
            value: contact.name
          })}
        </div>
        <div>
          ${input({
            label: "number",
            id: "number",
            type: "number",
            placeholder: "Number",
            required: true,
            value: contact.number
          })}
        </div>
        <div>
          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            required: true,
            value: contact.email
          })}
        </div>
        <div>
          <select class="select-margin select__input" name="relation">
            <option value="Family" ${contact.relation=="Family" ? "selected" : ""}>Family</option>
            <option value="Friends" ${contact.relation=="Friends" ? "selected" : ""}>Friends</option>
            <option value="Work" ${contact.relation=="Work" ? "selected" : ""}>Work</option>
            <option value="Acquaintance" ${contact.relation=="Acquaintance" ? "selected" : ""}>Acquaintance</option>
          </select>
        </div>
        <div>
          <a href="#">Cancel</a>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  `
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
    listenSubmitForm();
  }
}

export default editContactPage