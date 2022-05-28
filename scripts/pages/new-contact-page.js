import { input } from "../components/input.js"
import { createContact } from "../services/contact-services.js"
import HomePage from "./homepage.js"
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";


function render() {
  return `
    <header>
      <h1>Create new contact</h1>
      <a href="#">Logout</a>
    </header>
    <section>
      <form class="js-new-contact-form">
        <div>
          ${input({
            label: "name",
            id: "name",
            type: "name",
            placeholder: "Name",
            required: true
            // value:
          })}
        </div>
        <div>
          ${input({
            label: "number",
            id: "number",
            type: "number",
            placeholder: "Number",
            required: true
            // value:
          })}
        </div>
        <div>
          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            required: true
            // value:
          })}
        </div>
        <div>
          <select name="relation">
            <option value="" selected disabled>Relation</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Work">Work</option>
            <option value="Acquaintance">Acquaintance</option>
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
  const form = document.querySelector(".js-new-contact-form")

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { name, number, email, relation } = event.target

    const newContact = {
      name: name.value,
      number: number.value,
      email: email.value,
      relation: relation.value
    }

    await createContact(newContact)
    await STORE.filterContacts();
    DOMHandler.load(HomePage)

  })
}

const NewContactPage = {
  toString() {
    return render()
  },
  addListeners() {
    listenSubmitForm();
  }
}

export default NewContactPage