import AddForm from '../../components/AddForm/AddForm.tsx';
import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchLoading, resNoteList } from './notesSlice.ts';
import { useEffect } from 'react';
import { fetchNotes } from '../store/thunks/thunks.ts';
import { apiUrl } from '../../../globalConstants.ts';

const Notes = () => {

  const dispatch = useAppDispatch();
  const notes = Object.values(useAppSelector(resNoteList));
  const isFetchNoteLoading = useAppSelector(fetchLoading);


  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch]);

  return (
    <Container>
      <Grid container gridRow={2} spacing={4}>
        <Grid size={4}>
          <AddForm />
        </Grid>
        <Box
          sx={{
            width: "50%",
            overflowY: "auto",
            height: 400,
            p: 4,
            mt: 10,
          }}
        >
          {isFetchNoteLoading ? <CircularProgress /> :
            <>
              {notes.map((note) => (
                <div key={note.id}>
                  <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 4, mx: "auto"}}>
                    {!note.image ? null : (
                      <CardMedia
                        sx={{ height: 140 }}
                        component="img"
                        image={`${apiUrl}/${note.image}`}
                        title={note.message}
                      />
                    )}

                    <CardContent sx={{ padding: '10px', gridRow: '1rem, 1rem' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {note.author ? note.author : "Anonymous"}
                      </Typography>
                      <Typography>
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {note.message}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </>
          }
        </Box>

      </Grid>
    </Container>

  );
};

export default Notes;