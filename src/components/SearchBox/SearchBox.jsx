import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { setStatusFilter } from "../../redux/filters/slice";
import { selectFilter } from "../filters/selectors";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(setStatusFilter(value));
  };
  return (
    <>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.filter}
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </>
  );
};
