const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas")
const ytdl = require("ytdl-core");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]   
});

var data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("commande pour supprimer des messages")
    .addIntegerOption(option => 
        option.setName("number")
            .setDescription("Nombre de messages que vous voulez supprimer")
            .setRequired(true)
    );

const prefix = "!";

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "clear"){
            var number = interaction.options.getInteger("number");

            if(number >= 1 && number <= 100){
                interaction.channel.bulkDelete(number);
                interaction.reply({content: number + " messages correctement supprimés", ephemeral: true});
            }
            else {
                interaction.reply({content: "Le nombre de messages supprimés doit être situé entre 1 et 100", ephemeral: true});
            }
        }
    }
});

Client.on("ready", () => {

    Client.application.commands.create(data);
    
    Client.guilds.cache.get("964953112106393660").commands.create(data);

    console.log("bot opérationnel");
});

Client.on("interactionCreate", interaction =>{
    if(interaction.isCommand()){
        if(interaction.commandName === "ping"){
            let user = interaction.options.getUser("utilisateur");

            if(user != undefined){
                interaction.reply("pong <@" + user.id +">");
            }
            else {          
                interaction.reply("pong");
            }    
        }
    }
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;
    
    //!help
    if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Liste des commandes")
            .setURL("https://discord.js.org/")
            .setDescription("Vous y trouverez la liste de mes commandes")
            .setThumbnail("https://yt3.ggpht.com/ytc/AKedOLReTuMclx50pE1SEDdnxQlUkNvVHXOOOC9WJ4JI2g=s900-c-k-c0x00ffffff-no-rj")
            .setAuthor("Gartic Bot", "https://yt3.ggpht.com/ytc/AKedOLReTuMclx50pE1SEDdnxQlUkNvVHXOOOC9WJ4JI2g=s900-c-k-c0x00ffffff-no-rj", "https://discord.js.org/")
            .addField("__!help__", "Affiche ma liste de commandes")
            .addField("__!gartic__", "Vous emmène sur Gartic Phone")

            message.channel.send({ embeds: [embed]});
    }
    
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if(message.content === prefix + "gartic"){
        const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Gartic Phone")
        .setDescription("Vous emmènes sur Gartic Phone")
        .setURL("https://garticphone.com/fr")
        .setThumbnail("https://yt3.ggpht.com/ytc/AKedOLReTuMclx50pE1SEDdnxQlUkNvVHXOOOC9WJ4JI2g=s900-c-k-c0x00ffffff-no-rj")
        .setAuthor("Gartic Bot", "https://yt3.ggpht.com/ytc/AKedOLReTuMclx50pE1SEDdnxQlUkNvVHXOOOC9WJ4JI2g=s900-c-k-c0x00ffffff-no-rj", "https://discord.js.org/")

        message.channel.send({ embeds: [embed]});
    }
});

Client.on("guildMemberAdd", async member => {
    console.log("un membre est arrivé. 😁");
    Client.channels.cache.get("965000622774575174").send("<@" + member.id + "> est arrivés 😁")
    member.roles.add("965004576434565120");

    var canvas = Canvas.createCanvas(1024, 500);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./background.png");
    ctx.drawImage(background, 0, 0, 1024, 500);

    ctx.font = "42px IMPACTED";
    ctx.fillStyle = "#ffffff";
    ctx.textAlingn = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410);

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 393, 47, 238, 238)

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

    Client.channels.cache.get("965000622774575174").send({files: [attachment]});
});

Client.on("guildMemberRemove", member => {
    console.log("un membre a quitté le serveur. 😭");
    Client.channels.cache.get("965000705343635526").send("<@" + member.id + "> nous à quitté 😭")
})

Client.login(process.env.TOKEN);