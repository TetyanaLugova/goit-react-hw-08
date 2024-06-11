import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map((contact) => (
          <li className={css.item} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};
