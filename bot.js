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
    if (ctx.message.text.length === 4) return ctx.reply('Please, write activity name');
    await db.write(ctx.message.text.slice(5).trimStart());
    ctx.reply('Excellent! New activity mark has been created!');
});

bot.on(message('text'), ctx => {
    ctx.reply('You can create activity mark using /new {activity name}');
});

await db.start('marks');
bot.launch();