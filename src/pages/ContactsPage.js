import { useState } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactsList/ContactsList";
import Filter from "../components/Filter/Filter";
import Modal from "../components/Modal/Modal";

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    return setIsModalOpen((state) => !state);
  }
  return (
    <>
      <h1>Phonebook</h1>
      <button onClick={toggleModal}>Add </button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          {<ContactForm onSave={toggleModal} />}
        </Modal>
      )}

      <Filter />
      <ContactList />
    </>
  );
}
