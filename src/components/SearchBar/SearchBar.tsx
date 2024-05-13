import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

const notify = (): string => toast.error("This field can not be empty!");

type Props = {
  onSubmit: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputQuery: string =
      (e.currentTarget.elements.namedItem("query") as HTMLInputElement)
        ?.value || "";
    if (inputQuery === "") {
      notify();
      return;
    }
    onSubmit(inputQuery);
    e.currentTarget.reset;
  };

  return (
    <header className={css.header}>
      <Toaster />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.submitBtn}>
          <FaSearch /> Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
