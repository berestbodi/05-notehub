import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm, { type CreateNoteFormValues } from "../NoteForm/NoteForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query],
    queryFn: () => fetchNotes(currentPage, query),
    placeholderData: keepPreviousData,
  });

  const addNote = useMutation({
    mutationFn: (data: CreateNoteFormValues) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNoteById = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} setQuery={setQuery} />

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
      <NoteList notes={data?.notes} onDelete={deleteNoteById.mutate} />
      {modalState && (
        <Modal onClose={() => setModalState(false)}>
          <NoteForm
            onClose={() => setModalState(false)}
            onSubmit={addNote.mutate}
          />
        </Modal>
      )}
    </div>
  );
}
