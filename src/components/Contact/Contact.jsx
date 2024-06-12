import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";

export default function Contact({ contact }) {
  const { name, number, id } = contact;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <>
      <div>
        <p className={css.name}>
          <FaUser /> {name}
        </p>

        <p className={css.number}>
          <FaPhone /> {number}
        </p>
      </div>

      <button className={css.btn} type="submit" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
