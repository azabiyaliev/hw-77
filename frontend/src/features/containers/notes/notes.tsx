import AddForm from '../../components/AddForm/AddForm.tsx';
import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { resNoteList } from './notesSlice.ts';
import { useEffect } from 'react';
import { fetchNotes } from '../store/thunks/thunks.ts';
import { apiUrl } from '../../../globalConstants.ts';

const Notes = () => {

  const dispatch = useAppDispatch();
  const notes = useAppSelector(resNoteList);
  const reverseNotes = [...notes].reverse();
  console.log(notes);

  useEffect(() => {
    dispatch(fetchNotes());
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
            {reverseNotes.map((note) => (
              <div key={note.id}>
                <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 4, mx: "auto"}}>
                  {!note.image ? null : (
                    <CardMedia
                    sx={{ height: 140 }}
                    component="img"
                    image={apiUrl + "/" + note.image}
                  />
                  )}

                  <CardContent sx={{ padding: '10px', gridRow: '1rem, 1rem' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {!note.author ? "Anonymous" : note.author}
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
        </Box>

      </Grid>
    </Container>

  );
};

export default Notes;