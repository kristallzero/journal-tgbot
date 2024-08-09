# Journal telegram bot
Bot was created to analyze where time goes.

## Available features:
- Set time marks of starting an activity
- Set a bot password

## Todo
- Several users support
- Show time marks
- Show how much time an activity got 
- Deleting marks
- Editing marks
- Setting categories for activities
- Generating plots
- Add basic categories hotkeys
- Add basic activities hotkeys
- Move database from json to MongoDB or MySQL

## How to run
1. Create `.env` file and write there the bot token and a password:
```
BOT_TOKEN={your_bot_token}
BOT_PASSWORD={your_password}
```
1. Run `npm run start`
2. Open your bot, write /start and write your password