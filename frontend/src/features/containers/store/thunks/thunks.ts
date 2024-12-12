import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';

export const fetchPostNote = createAsyncThunk<void, INote>(
  "postNote/fetchPostNote",
  async (form) => {
    const formData = new FormData();

    const keys = Object.keys(form) as (keyof INote)[];

    keys.forEach(key => {
      const value = form[key];

      if (value !== null) {
      formData.append(key, value);
    }
  })

  await axiosAPI.post("/notes", formData);
});

export const fetchNotes = createAsyncThunk<IResponseNote[], void>(
  "notes/fetchNotes",
  async () => {
    const response = await axiosAPI.get<IResponseNote[]>("/notes");
    return response.data || [];
});