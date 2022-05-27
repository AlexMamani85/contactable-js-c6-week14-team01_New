import apiFetch from "./api-fetch";

export function getContacts(){
    return apiFetch("contacts");
}

export function deleteContact(id){
    return apiFetch(`contacts/${id}`, {
        method: "DELETE"
    })
}

export function createContact(newContact = { name, number, email, relation}){
    return apiFetch("contacts", {
        body: newContact
    })
}

export function editContact(id, data = { name, number, email, relation, favorite}){
    return apiFetch(`contacts/${id}`, {
        body: data
    })
}
