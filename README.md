<p align="center">
  <img src="https://raw.githubusercontent.com/popeye68/chatidinfo/main/bot-img.png" alt="ChatID Info Bot" width="200">
</p>

# 🤖 ChatID Info Bot  
> A slick Telegram bot to **fetch chat IDs** from users, groups, or channels using interactive buttons — with **zero Telegram restrictions**.  
> 📍 No need to guess chat IDs anymore. Just click a button and let the bot handle the rest.

<p align="center">
  <a href="http://t.me/Get_chatid_infobot">
    <img src="https://img.shields.io/badge/Run%20Bot-@Get_chatid_infobot-blue?logo=telegram" alt="Run Bot">
  </a>
</p>

---

## ⚙️ Features

- 🔘 One-tap **keyboard button** to select section.
- 👥 Works in **private chats**, **groups**, and **channels**.
- 🚫 **Bypasses Telegram restrictions** that block `chat.id` access.
- 🧠 Built for speed and simplicity — even for non-tech users.
- ☁️ Deploy anywhere: Koyeb, Replit, Heroku, Glitch.

---

## 🚀 Quick Start

### 🧾 How to Use the Bot

1. **Start the bot** via `/start`
2. Click the **“select”** button
3. The bot instantly replies with selected  `chat_id`, and chat link.

---

## 🛠 Deploy Your Own Bot

Clone the repo and deploy it on your favorite platform.

> 📦 Repository: [popeye68/chatidinfo](https://github.com/popeye68/chatidinfo)

### 1️⃣ One-Click Deploy

| Platform   | Deploy |
|------------|--------|
| 🟦 Koyeb    | [![Deploy on Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/popeye68/chatidinfo&branch=main&name=chatidinfo) |
| 🟨 Replit   | [![Run on Replit](https://replit.com/badge/github/popeye68/chatidinfo)](https://replit.com/github/popeye68/chatidinfo) |
| 🟥 Heroku   | [![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/popeye68/chatidinfo) |
| 🟪 Glitch   | [![Remix on Glitch](https://img.shields.io/badge/Remix_on-Glitch-purple?logo=glitch)](https://glitch.com/edit/#!/import/github/popeye68/chatidinfo) |


---

## 🧑‍💻 Environment Variables

| Variable        | Description                    |
|----------------|--------------------------------|
| `TOKEN`     | Your bot’s token from BotFather |

> Example `.env` for local or secret configuration:
TOKEN=123456:ABC-YourBotTokenHere


---

## 📦 Install & Run Locally

```bash
git clone https://github.com/popeye68/chatidinfo
cd chatidinfo
npm install
node index.js
```


## 🤖 ChatID Info Bot - Developer Note
 *
 * This bot uses `node-telegram-bot-api` and inline keyboard buttons
 * to bypass restrictions that normally prevent bots from accessing `chat.id`
 * without user messages.
 *
 * ✅ Automatically detects private chats, groups, and channels.
 * ✅ Works via button clicks, not message text — keeping it clean.
 *
 * 🔐 No sensitive user data is stored.
 *
 * Feel free to fork and customize for your own needs.


---

## 📜 License

**MIT** — free to use, modify, and deploy.

> Created with ❤️ by [popeye](https://github.com/popeye68)


