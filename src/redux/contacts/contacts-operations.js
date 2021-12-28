import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllContacts, deleteContacts, addContact } from "./contacts-api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await fetchAllContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await deleteContacts(contactId);
      return contactId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async (contac, { rejectWithValue }) => {
    try {
      const contact = await addContact(contac);
      return contact;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const fetchContacts = () => (dispatch) => {
//   dispatch(fetchContactRequest());

//   axios
//     .get("/contacts")
//     .then(({ data }) => dispatch(fetchContactSuccess(data)))
//     .catch((error) => dispatch(fetchContactError(error)));
// };

// export const addContacts =
//   ({ name, number }) =>
//   (dispatch) => {
//     const contact = { name: name, number: number };

//     dispatch(addContactRequest());

//     axios
//       .post("/contacts", contact)
//       .then(({ data }) => dispatch(addContactSuccess(data)))
//       .catch((error) => dispatch(addContactError(error)));
//   };

// export const deleteContacts = (contactId) => (dispatch) => {
//   dispatch(deleteContactRequest());

//   axios
//     .delete(`/contacts/${contactId}`)
//     .then(() => dispatch(deleteContactSuccess(contactId)))
//     .catch((error) => dispatch(deleteContactError(error)));
// };
