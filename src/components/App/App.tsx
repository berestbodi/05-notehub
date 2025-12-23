import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../servises/noteService";
import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />

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
      {modalState && <Modal onClose={() => setModalState(false)} />}
    </div>
  );
}
