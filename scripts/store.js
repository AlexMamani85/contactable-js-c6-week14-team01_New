import { getContacts } from "./services/contact-services.js"

async function filterContacts(){
  const contacts = await getContacts();

  this.contacts = contacts.filter(contact => contact.user_id === this.user.id );
} 

function showContact(id){
  return this.contacts.find(contact=>contact.id==id)

} 

const STORE = {
  user: null,
  contacts: [],
  currenTab: "",
  contactId: null,
  filterContacts,
  showContact
};

export default STORE