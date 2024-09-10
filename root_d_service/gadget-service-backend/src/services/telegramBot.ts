import axios from 'axios';

// Токен вашого бота
const TELEGRAM_BOT_TOKEN = '7351088520:AAEKKXD1X1QpTbkoUWX0AKVaCYvuwnsfxiQ';

// Нікнейм користувача, якому будемо надсилати запити
const TELEGRAM_USERNAME = 'tiger_gene';

// Отримання ID чату через нікнейм користувача
const getChatIdByUsername = async (username: string): Promise<number | null> => {
  try {
    // Важливо, щоб користувач почав чат з ботом хоча б раз, щоб бот міг надсилати повідомлення
    const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const messages = response.data.result;

    // Пошук ID чату по username
    for (const message of messages) {
      if (message.message.from.username === username) {
        return message.message.from.id;
      }
    }

    return null; // Якщо ID чату не знайдено
  } catch (err) {
    console.error('Error fetching chat ID:', err);
    return null;
  }
};

// Функція для надсилання повідомлення
export const sendCallRequestToTelegram = async (name: string, phone: string) => {
  try {
    const chatId = await getChatIdByUsername(TELEGRAM_USERNAME);
    
    if (!chatId) {
      console.error('Chat ID not found. Please make sure the user has interacted with the bot.');
      return;
    }

    const message = `New Call Request:\nName: ${name}\nPhone: ${phone}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    console.log('Message sent to Telegram.');
  } catch (err) {
    console.error('Error sending message to Telegram:', err);
  }
};
