require("dotenv").config();

const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);

async function checkGoldETF() {
  try {

    // Example ETF page/API
    const response = await axios.get(
      "https://query1.finance.yahoo.com/v8/finance/chart/GOLDBEES.NS"
    );

    const price =
      response.data.chart.result[0].meta.regularMarketPrice;

    console.log("Gold ETF Price:", price);

    // Example alert condition
    if (price < 200) {

      const message = `
📉 Gold ETF Alert

Current Price: ₹${price}

Price dropped below ₹80
`;

      await bot.sendMessage(process.env.CHAT_ID, message);

      console.log("Notification sent!");
    }

  } catch (error) {
    console.log(error.message);
  }
}

checkGoldETF();