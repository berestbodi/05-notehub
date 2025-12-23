import axios from "axios";
import type { Note } from "../types/note";

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

export async function fetchNotes(currentPage: number): Promise<NoteRes> {
  const url = "https://notehub-public.goit.study/api/notes";
  const res = await axios.get<NoteRes>(url, {
    ...options,
    params: { page: currentPage, perPage: 12 },
  });
  return res.data;
}

// export async function createNote(params: type) {}

// export async function deleteNote(id: string) {
// 	const res = await.delete()
// }
