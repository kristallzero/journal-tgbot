import fs from "fs";

export default class {
    #dbPath;
    #db;

    async start(dbName) {
        this.#dbPath = `data/${dbName}.json`;
        if (!fs.existsSync(this.#dbPath)) {
            if (!fs.existsSync('data')) fs.mkdirSync('data');
            this.#db = {
                marks: [],
                addingMark: false
            };
            await this.save();
        } else {
            this.#db = JSON.parse(fs.readFileSync(this.#dbPath));
        }
    }

    createMark(name, time) {
        this.#db.marks.push({ name, time });
    }

    changeAddingMark(state) {
        this.#db.addingMark = state;
    }

    getAddingMark() {
        return this.#db.addingMark;
    }

    async save() {
        fs.writeFileSync(this.#dbPath, JSON.stringify(this.#db));
    }
}