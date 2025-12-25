import axios from "axios";
import type { Note } from "../types/note";
import type { CreateNoteFormValues } from "../components/NoteForm/NoteForm";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myKey}`,
  },
};

export interface NoteRes {
  notes: Note[];
  totalPages: number;
}

const url = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(
  currentPage: number,
  query?: string
): Promise<NoteRes> {
  const res = await axios.get<NoteRes>(url, {
    ...options,
    params: { page: currentPage, perPage: 12, search: query },
  });
  return res.data;
}

export async function createNote(values: CreateNoteFormValues): Promise<Note> {
  const res = await axios.post<Note>(url, values, { ...options });

  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(url + `/${id}`, { ...options });

  return res.data;
}
