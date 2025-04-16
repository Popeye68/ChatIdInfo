const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TOKEN;// add bot token in .env or in secret
const botUsername = 'Get_chatid_infobot';// replace with your bot username without @
const bot = new TelegramBot(token, { polling: true });

const mainKeyboard = {
  reply_markup: {
    keyboard: [
      [
        {
            text: 'Select User',
              request_user: {
                request_id: 1,
                user_is_bot: false
              }
            },
            {
              text: 'Select Bot',
              request_user: {
                request_id: 2,
                user_is_bot: true 
          }
        }
      ],
      [
        {
          text: 'Select Group',
          request_chat: {
            request_id: 3,
            chat_is_group: true
          }
        },
        {
          text: 'Select Channel',
          request_chat: {
            request_id: 4,
            chat_is_channel: true
          }
        }
      ],
      [
        {
          text: 'Private Group',
            request_chat: {
              request_id: 5,
              chat_is_group: true,
              has_username: false
          }
        },
        {
          text: 'Public Group',
          request_chat: {
            request_id: 6,
            chat_is_group: true,
            has_username: true
          }
        }
      ],
      [
        {
            text: 'Private Channel',
              request_chat: {
                request_id: 12,
                chat_is_channel: true,
                has_username: false
          }
        },
        {
          text: 'Public Channel',
          request_chat: {
            request_id: 8,
            chat_is_channel: true,
            has_username: true
          }
        }
      ],
      [
        {
          text: 'Admin Group',
          request_chat: {
            request_id: 9,
            chat_is_group: true,
            user_administrator_rights: {
              can_invite_users: true
            }
          }
        },
        {
          text: 'Admin Channel',
          request_chat: {
            request_id: 10,
            chat_is_channel: true,
            user_administrator_rights: {
              can_post_messages: true
            }
          }
        }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1];

  if (param && param.startsWith('link_')) {
    const id = param.replace('link_', '');

    if (id.startsWith('-100')) {
      const pureId = id.replace('-100', '');
      bot.sendMessage(chatId, 'Here is your chat link:', {
        reply_markup: {
          inline_keyboard: [[
            { text: 'Chat Link', url: `https://t.me/c/${pureId}/10000000` }
          ]]
        }
      });
    } else {
      bot.sendMessage(chatId, 'Here are your links:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Android', url: `tg://openmessage?user_id=${id}` }],
            [{ text: 'iOS', url: `https://t.me/@id${id}` }]
          ]
        }
      });
    }
  } else {
    // Send the welcome message with the main keyboard
    bot.sendMessage(chatId, 
      '👋 Welcome to the bot! \n\n' +
      'This bot allows you to interact with users, groups, and channels using the buttons below. ' +
      'You can select users, groups, or channels and get their details or links.\n\n' +
      'Feel free to explore the options and try out the features!',
      {
        reply_markup: {
          keyboard: mainKeyboard.reply_markup.keyboard,
          resize_keyboard: true,
          one_time_keyboard: false
        }
      }
    );

    // Send the inline button for the GitHub repository separately
    setTimeout(() => {
      bot.sendMessage(chatId, '🔗 Check out the GitHub repository for this bot:', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'GitHub Repository', url: 'https://github.com/popeye/ChatIdInfo' }
            ]
          ]
        }
      });
    }, 100); // Delay of .1 second (100 milliseconds)
  }
});

const requestTypes = {
  1: 'User',
  2: 'Bot',
  3: 'Group',
  4: 'Channel',
  5: 'Private Group',
  6: 'Public Group',
  7: 'Private Channel',
  8: 'Public Channel',
  9: 'Admin Group',
  10: 'Admin Channel'
};

bot.on('message', async (msg) => {
  if (msg.user_shared) {
    const userId = msg.user_shared.user_id;
    const type = requestTypes[msg.user_shared.request_id] || 'User';
    const infoLink = `https://t.me/Get_chatid_infobot?start=link_${userId}`; // add your bot username

    bot.sendMessage(msg.chat.id,
      `✅ You selected a ${type}!\n\n` +
      `User ID: \`${userId}\``,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: 'Link to chat ID', url: infoLink }
          ]]
        }
      }
    );
  }

  if (msg.chat_shared) {
    const sharedId = msg.chat_shared.chat_id;
    const type = requestTypes[msg.chat_shared.request_id] || 'Private Channel';
    const infoLink = `https://t.me/Get_chatid_infobot?start=link_${sharedId}`; // add your bot username

    try {
      const chat = await bot.getChat(sharedId);
      const name = chat.username ? `@${chat.username}` : (chat.title || 'Unknown');
      bot.sendMessage(msg.chat.id,
        `✅ You selected a ${type}!\n\n` +
        `Name: *${name}*\n` +
        `Chat ID: \`${sharedId}\``,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[
              { text: 'Link to chat', url: infoLink }
            ]]
          }
        }
      );
    } catch (err) {
      bot.sendMessage(msg.chat.id,
        `✅ You selected a ${type}!\n\n` +
        `Chat ID: \`${sharedId}\``,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[
              { text: 'Link to chat', url: infoLink }
            ]]
          }
        }
      );
    }
  }
});

bot.on('message', (msg) => {
  if (msg.chat_shared) {
    console.log('Chat Shared:', msg.chat_shared);
  }
});

const OWNER_ID = process.env.OWNER_ID;


let lastFrom = null;
let lastId = null;

bot.on('message', (msg) => {
    let user = msg.forward_from;

    if (!user && !msg.forward_from_chat) {
        // Not forwarded, show sender info
        user = msg.from;
    }

    if (user) {
        if (lastFrom === msg.from.id && lastId === user.id) return;

        let text = '';
        if (user.username) text += `@${user.username}\n`;
        text += `Id: ${user.id}\n`;
        text += `First: ${user.first_name}\n`;
        if (user.last_name) text += `Last: ${user.last_name}\n`;
        if (user.language_code) text += `Lang: ${user.language_code}\nYour Data ✅`;

        lastFrom = msg.from.id;
        lastId = user.id;

        bot.sendMessage(msg.chat.id, text);
    } else if (msg.forward_from_chat) {
        const channel = msg.forward_from_chat;
        let text = '';
        if (channel.username) text += `@${channel.username}\n`;
        text += `Id: ${channel.id}\n`;
        text += `Title: ${channel.title}\n`;

        if (msg.forward_from_message_id && channel.username) {
            text += `https://t.me/${channel.username}/${msg.forward_from_message_id}`;
        }

        bot.sendMessage(msg.chat.id, text);
    }
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    const helpMessage = `
🤖 *User Info Bot Help*

Here are the available commands:

/start – Start the bot
/help – Show this help message

ℹ️ To get user/channel info, *forward a message* from them or you can use *keyboard buttons*.

👑 Bot Owner: [Click here](https://t.me/Asmultiverse_token)
    `;

bot.sendMessage(chatId, helpMessage, {
        parse_mode: "Markdown",
        disable_web_page_preview: true
    });
});
console.log("Bot is running!");
