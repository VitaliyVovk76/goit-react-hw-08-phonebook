import React from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactsList/ContactsList";
import Filter from "../components/Filter/Filter";

export default function ContactsPage() {
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
}
