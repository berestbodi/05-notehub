import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [query, setQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query],
    queryFn: () => fetchNotes(currentPage, query),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          query={query}
          setState={(query: string, page: number) => {
            setQuery(query);
            setCurrentPage(page);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setModalState(true)}>
          Create note +
        </button>
      </header>
      <NoteList notes={data?.notes} />
      {modalState && (
        <Modal onClose={() => setModalState(false)}>
          <NoteForm onClose={() => setModalState(false)} />
        </Modal>
      )}
    </div>
  );
}
