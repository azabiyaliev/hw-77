import {promises as fs} from "fs";
import {INote, INoteWithId} from "./types";
import crypto from "crypto";

const fileName = `./db.json`;
let data: INote [] = [];

const fileDb = {
    async init() {
        try {
            const noteContent = await fs.readFile(fileName);
            data = JSON.parse(noteContent.toString()) as INote[];
        } catch (e) {
            console.error(e);
        }
    },
    async getItems() {
        return data;
    },

    async addItem(item: INoteWithId) {
        const id = crypto.randomUUID();
        const note = {id, ...item};
        data.push(note);
        await this.save();
        return note;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;