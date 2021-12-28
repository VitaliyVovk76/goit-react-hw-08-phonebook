import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "https://61bc6358d8542f00178246fc.mockapi.io";
axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const fetchAllContacts = () => {
  return axios.get("/contacts").then((response) => response.data);
};

export const addContact = (contact) => {
  return axios.post("/contacts", contact).then(({ data }) => data);
};

export const deleteContacts = (contactId) => {
  return axios.delete(`/contacts/${contactId}`);
};

export const updateContact = (contactId, update) => {
  return axios.patch(`/contacts/${contactId}`, update).then(({ data }) => data);
};
