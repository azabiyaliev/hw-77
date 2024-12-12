import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { fetchNotes, fetchPostNote } from '../store/thunks/thunks.ts';

interface noteState {
  responseNote: IResponseNote[];
  isFetching: boolean;
  error: boolean;
}

const initialState: noteState = {
  responseNote: [],
  isFetching: false,
  error: false,
};

export const resNoteList = (state: RootState) => state.notes.responseNote;

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers:{
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchPostNote.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPostNote.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPostNote.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchNotes.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<IResponseNote[]>) => {
        state.isFetching = true;
        state.responseNote = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
  },

});

export const notesReducer = notesSlice.reducer;
