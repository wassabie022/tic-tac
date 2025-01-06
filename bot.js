const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

// Укажите ваш токен, полученный от BotFather
const BOT_TOKEN = 'Ваш_Telegram_Token_Здесь'; // Замените на ваш токен
const bot = new Telegraf(BOT_TOKEN);

// Файл с HTML для отправки в Telegram (на будущее, если нужно отправлять файлы)
const htmlFilePath = path.join(__dirname, 'index.html');

// Приветственное сообщение при старте
bot.start((ctx) => {
  ctx.reply('Привет! Добро пожаловать в игру "Крестики-нолики".\n\n' +
    'Доступные команды:\n' +
    '/play - Запустить игру локально\n' +
    '/web - Открыть игру через Web App');
});

// Команда для запуска игры локально (ссылка на ваш хостинг)
bot.command('web', (ctx) => {
  ctx.reply('Нажмите кнопку ниже, чтобы открыть игру.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть игру',
            web_app: { url: 'https://ваш-сайт.com' }, // Замените на ваш URL
          },
        ],
      ],
    },
  });
});

// Команда для отправки HTML-файла игры (если нужно отправить файл)
bot.command('play', async (ctx) => {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    ctx.reply(
      'К сожалению, Telegram не поддерживает выполнение HTML-игр напрямую. ' +
      'Вы можете открыть игру через Web App (используйте команду /web).'
    );
  } catch (error) {
    console.error('Ошибка при отправке HTML-файла:', error);
    ctx.reply('Произошла ошибка при запуске игры. Попробуйте позже.');
  }
});

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply('Я не знаю, как на это ответить. Используйте /play или /web, чтобы начать.');
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот успешно запущен!');
});

// Обработка сигналов завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
