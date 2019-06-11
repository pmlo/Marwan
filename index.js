const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('npm');
const readline = require('readline');

const config = require('./config.json');
const bot = new Discord.Client();

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

bot.on("ready", () => {
    clear();
});

bot.on("message", (message) => {
    if(config.restrictToID == true && message.author.id != config.id) return;

    if(message.channel.type == "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "help"){
        const embed = new Discord.RichEmbed()
        .addField("Commands", cmdsArray)
        .addField("Info", "Thanks for using MassDM v2\nIt was very fun creating this bot.\nIf you need any help with this, contact me on V3rmillion. https://v3rmillion.net/member.php?action=profile&uid=416339");
        message.channel.send({embed: embed});
    }

    if(command == "a") {
        let dmGuild = message.guild;

        dmGuild.members.forEach(member => {
            setTimeout(function(){
                if(member.id == bot.user.id) return;
                console.log(`DMing ${member.user.username}`);
                member.send(`**Salut mon ami, rejoint vite le serveur __La France De Fortnite__ \n\n https://discord.gg/XY72fga \n\n Je t'attends , A tout de suite** 😃`);
            }, 30000);
        });
    }

    if(command == "dmrole") {
        let role = message.mentions.roles.first();
        let msg = args.join(' ');
        
        if(!role) {
            message.author.send("No valid role mentioned!");
            return;
        }

        if(!msg || msg.length <= 0) {
            message.author.send("Specify a message!");
            return;
        }

        role.members.forEach(member => {
            setTimeout(function() {
                if(member.id == bot.user.id) return;
                console.log(`DMing ${member.user.username}`);
                member.send(`**Salut mon ami, rejoint vite le serveur __La France De Fortnite__ \n\n https://discord.gg/XY72fga \n\n Je t'attends , A tout de suite** 😃`);
            }, Math.floor(Math.random() * 90000));
        });
    }
    if(command == "test") {
        message.react("✅")
    }
});

bot.on("error", (error) => {
    bot.login(config.token);
});

bot.login(config.token);

function clear() {
    console.clear();
    console.log(figlet.textSync("MassDM v2.0.1").green);
    console.log("\n\nMass DM bot for Discord. Created by Gringo(Scammer ALT).\n");
    console.log("Now with a better self-bot anti-ban system!");
    console.log(`Type ${config.prefix}help in a chat.`);
}

bot.on("ready", () => {
    console.log("Je suis prêt !");
    bot.user.setActivity("Mp For Support !", {type: "STREAMING", url:"https://www.twitch.tv/lafrancedefortnite"});
});
