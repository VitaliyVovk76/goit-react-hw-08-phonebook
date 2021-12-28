import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../../redux/contacts/contacts-operations";
import { getContacts } from "../../redux/contacts/contacts-selectors";
import s from "./ContactForm.module.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const allContacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const hendleChange = (event) => {
    if (event.currentTarget.name === "name") {
      setName(event.currentTarget.value);
    }
    if (event.currentTarget.name === "number") {
      setNumber(event.currentTarget.value);
    }
  };

  const hendleSubmit = (event) => {
    event.preventDefault();
    if (checkName(name)) {
      alert(`${name} is alreadi in contacts`);
      reset();
      return;
    }

    dispatch(addContacts({ name, number }));
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const checkName = (newName) =>
    allContacts.find(({ name }) => name === newName);

  return (
    <form className={s.contactForm} onSubmit={hendleSubmit}>
      <label className={s.formLabel}>
        Name
        <input
          className={s.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={hendleChange}
        />
      </label>
      <label className={s.formLabel}>
        <span>Number</span>
        <input
          className={s.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={hendleChange}
        />
      </label>

      <button className={s.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
}
