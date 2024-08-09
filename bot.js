import { Telegraf } from "telegraf";
import DB from "./db.js";
import { message } from "telegraf/filters";

const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);
const db = new DB();

bot.start(ctx => {
    ctx.reply(`Hello ${ctx.from.username || ctx.from.first_name}!\nYou can create activity mark using /new {activity name}`);
});

bot.command('new', async ctx => {
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
    if (!db.getAddingMark()) return ctx.reply('You can create activity mark using /new {activity name}');
    db.changeAddingMark(false);
    db.createMark(ctx.message.text, Date.now());
    await db.save();
    ctx.reply('Excellent! New activity mark has been created!');
});

await db.start('marks');
bot.launch();