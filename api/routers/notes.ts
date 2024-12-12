import express from "express";
import fileDb from "../fileDb";
import {INoteWithId} from "../types";
import {imagesUpload} from "../multer";

const notesRouter = express.Router();

notesRouter.post("/", imagesUpload.single('image'), async (req, res) => {

    if (!req.body.message) {
        res.status(400).send({error: "Message must be present in request"});
        return;
    }

    const note: INoteWithId = {
        author: req.body.author,
        message: req.body.message,
        image: req.file ? 'images' + req.file.filename : null,
    }

    const saveNote = await fileDb.addItem(note);
    res.send(saveNote);
})


notesRouter.get("/", async (_req, res) => {
    const notes = await fileDb.getItems();
    res.send(notes);
});

export default notesRouter;