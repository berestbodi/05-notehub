import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export default function SearchBox({
  query,
  setQuery,
  setPage,
}: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    },
    500
  );
  return (
    <input
      className={css.input}
      type="text"
      defaultValue={query}
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
