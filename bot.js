import { Telegraf } from "telegraf";
import DB from "./db.js";
import { message } from "telegraf/filters";
import fs from "fs";

const { BOT_TOKEN, BOT_PASSWORD } = process.env;

const bot = new Telegraf(BOT_TOKEN);
const db = new DB();

bot.start(ctx => {
    ctx.reply(`Hello ${ctx.from.username || ctx.from.first_name}!\nTo continue write a password:`);
});

bot.command('new', async ctx => {
    if (!registredUsers.includes(ctx.from.id)) return ctx.reply('To continue write a password:');
    if (ctx.message.text.length === 4) {
        db.changeAddingMark(true);
        ctx.reply('Good! Now write activity mark:');
    } else {
        db.createMark(ctx.message.text.slice(5).trimStart(), Date.now());
        ctx.reply('Excellent! New activity mark has been created!');
    }
    await db.save();
});

bot.on(message('text'), async ctx => {
    if (!registredUsers.includes(ctx.from.id)) {
        if (BOT_PASSWORD === ctx.message.text) {
            registredUsers.push(ctx.from.id);
            fs.writeFileSync('data/registred_ids.json', JSON.stringify(registredUsers));
            ctx.reply('You can create activity mark using /new {activity name}');
        } else ctx.reply('Incorrect password');
        return;
    }
    if (!db.getAddingMark()) return ctx.reply('You can create activity mark using /new {activity name}');
    db.changeAddingMark(false);
    db.createMark(ctx.message.text, Date.now());
    await db.save();
    ctx.reply('Excellent! New activity mark has been created!');
});

await db.start('marks');
if (!fs.existsSync('data/registred_ids.json')) {
    fs.writeFileSync('data/registred_ids.json', '[]');
}
const registredUsers = JSON.parse(fs.readFileSync('data/registred_ids.json'));
bot.launch();