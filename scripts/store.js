import { getContacts } from "./services/contact-services.js"

async function filterContacts(){
  let contacts = await getContacts();

  contacts = contacts.filter(contact => contact.user_id === this.user.id);

  this.contacts = contacts.filter(contact => contact.favorite === false);
  this.favoriteContacts = contacts.filter(contact => contact.favorite === true);
} 

function showContact(id){
  let contact = this.contacts.find(contact => contact.id == id);
  if(!contact){
    contact = this.favoriteContacts.find(contact => contact.id == id)
  }
  
  return contact;
} 

const STORE = {
  user: null,
  contacts: [],
  favoriteContacts: [],
  currenTab: "",
  contactId: null,
  filterContacts,
  showContact
};

export default STORE