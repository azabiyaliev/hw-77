import {promises as fs} from "fs";
import {IMessage, IMessageWithDateTime} from "./types";
import crypto from "crypto";

const fileName = `./db.json`;
let data: IMessage [] = [];

const fileDb = {
    async init() {
        try {
            const messageContent = await fs.readFile(fileName);
            data = JSON.parse(messageContent.toString());
        } catch (e) {
            console.error(e);
        }
    },
    async getItems() {
        return data;
    },

    async addItem(item: IMessageWithDateTime) {
        const id = crypto.randomUUID();
        const message = {id, ...item};
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;