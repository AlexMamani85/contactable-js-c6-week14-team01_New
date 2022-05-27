import STORE from "./../store.js";


function renderContacts(contact) {
  return `
  <li>
    <p>contact avatar</p>
    <p>${contact.name}</p>
    <p>favorite icon</p>
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
          <ul>
            ${STORE.contacts.map(renderContacts).join("")}
          </ul>
        </div>
      </div>
    </main>

  `
}



const HomePage = {
  toString() {
    return render()
  },
  addListeners() {

  }
}

export default HomePage