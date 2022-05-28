import { getContacts } from "./services/contact-services.js"

async function filterContacts(){
  const contacts = await getContacts();

  this.contacts = contacts.filter(contact => contact.user_id === this.user.id );
} // pendiente

const STORE = {
  user: null,
  contacts: [],
  currenTab: "",
  filterContacts
};

export default STORE