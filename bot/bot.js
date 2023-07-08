require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const { fmt, bold } =require("telegraf/format");
const { enter } = Scenes.Stage;

const { BOT_TOKEN: token } = process.env;

// assert and refuse to start bot if token or webhookDomain is not passed
if (!token) throw new Error('"BOT_TOKEN" env var is required!');

// initialize a bot
const bot = new Telegraf(token);

bot.start(ctx => {
    return ctx.reply(fmt`Hello ${ctx.update.message.from.first_name}! If you'd like to add new contact, enter command ${bold`/add`}`);
});

const addContactWizard = new Scenes.WizardScene(
  'addContactWizard',
  (ctx) => {
    ctx.reply("Provide the name of your new contact.");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.contactData = {}; // Initialize contactData object
    ctx.session.contactData.name = ctx.message.text; // Store the name in the session
    ctx.reply("Thank you! Please let us know the user's age.");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.contactData.age = parseInt(ctx.message.text); // Store the age in the session as a number
    ctx.reply("Noted! Now, please provide the user's email address.");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.contactData.email = ctx.message.text; // Store the email in the session

    // Access the collected information
    const { contactData } = ctx.session;

    // Process the collected information and save it to the desired object structure
    const processedData = {
      name: contactData.name,
      age: contactData.age,
      email: contactData.email
    };

    // You can perform additional processing or save the data to a database here
    // ...

    ctx.reply(fmt`${bold`Contact added:`}\nName: ${processedData.name}\nAge: ${processedData.age}\nEmail: ${processedData.email}\n\nTo add another contact, enter command ${bold`/add`}`);

    // End the wizard
    return ctx.scene.leave();
  }
);

// Register the wizard scene with the bot
const stage = new Scenes.Stage([addContactWizard]);
bot.use(session());
bot.use(stage.middleware());

// Activate the scene when the '/add' command is used
bot.command('add', enter('addContactWizard'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));