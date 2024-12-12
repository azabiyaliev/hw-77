import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { fetchNotes, fetchPostNote } from '../store/thunks/thunks.ts';

interface noteState {
  responseNote: IResponseNote[];
  isFetching: boolean;
  isLoading: boolean;
}

const initialState: noteState = {
  responseNote: [],
  isFetching: false,
  isLoading: false,
};

export const resNoteList = (state: RootState) => state.notes.responseNote;
export const fetchLoading = (state: RootState) => state.notes.isFetching;
export const createLoading = (state: RootState) => state.notes.isLoading;

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers:{
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchPostNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostNote.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPostNote.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNotes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<IResponseNote[]>) => {
        state.isFetching = false;
        state.responseNote = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.isFetching = false;
      })
  },

});

export const notesReducer = notesSlice.reducer;
