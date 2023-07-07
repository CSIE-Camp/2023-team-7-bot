const { GatewayIntentBits, Client } = require("discord.js");
const LoadCommands = require("./Modules/LoadCommands");
const { BOT_TOKEN } = require("./config");

const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
}); 

LoadCommands(Bot, "./Commands");

Bot.on("interactionCreate", async (Interaction) => {
    if (!Interaction.isChatInputCommand()) return;
    const Command = Bot.commands.get(Interaction.commandName);
    if (!Command) return;
    try {
        await Command.execute(Bot, Interaction);
    } catch (error) {
        console.error(error);
    }
});

Bot.on("ready", () => {
    console.log(`✅ Logged in as ${Bot.user.tag} successfully!`);
});

Bot.login(BOT_TOKEN);