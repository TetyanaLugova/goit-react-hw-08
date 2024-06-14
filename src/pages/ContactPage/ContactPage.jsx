import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import { ContactList } from "../../components/ContactList/ContactList";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { selectLoading, selectContacts } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";

export default function ContactPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your contact book</PageTitle>
      <ContactForm />
      <SearchBox />
      <div>{isLoading && <Loader />}</div>
      <ContactList contacts={contacts} />
    </>
  );
}
