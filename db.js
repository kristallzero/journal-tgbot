import fs from "fs";

export default class {
    #dbPath;
    #db;

    async start(dbName) {
        this.#dbPath = `data/${dbName}.json`;
        if (!fs.existsSync(this.#dbPath)) {
            if (!fs.existsSync('data')) fs.mkdirSync('data');
            fs.writeFileSync(this.#dbPath, '[]');
            this.#db = [];
        } else {
            this.#db = JSON.parse(fs.readFileSync(this.#dbPath));
        }
    }

    async write(name) {
        this.#db.push({ name, time: Date.now() });
        fs.writeFileSync(this.#dbPath, JSON.stringify(this.#db));
    }
}