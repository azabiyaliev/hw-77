import express from "express";
import fileDb from "./fileDb";
import notesRouter from "./routers/notes";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use("/notes", notesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
}

run().catch(err => console.log(err));

