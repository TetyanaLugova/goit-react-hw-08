import "./App.css";
import { ContactList } from "./components/ContactList/ContactList";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoding } from "./redux/contactsSlice";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoding);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <ContactForm />
      <SearchBox />
      {isLoading && <Loader />}
      {isError && <p>Error loading contacts!</p>}
      <ContactList />
    </>
  );
}

export default App;
