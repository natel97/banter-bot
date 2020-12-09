(() => {
  require("dotenv").config();
  const Discord = require("discord.js");
  const client = new Discord.Client();
  client.login(process.env.TOKEN);
  client.once("ready", () => {
    client.on("voiceStateUpdate", async (before, after) => {
      if (before.member.id === client.user.id) return;
      if (before.channelID === null && after.channelID) {
        // Play startup noise :)
        const connection = await after.channel.join();
        const dispatch = connection.play("new-connection.mp3");
        dispatch.on("finish", () => connection.disconnect());
        dispatch.on("error", () => connection.disconnect());
      }
    });

    client.on("messageReactionAdd", (react, user) => {
      if (react.message.author.id !== client.user.id) return;
      // react.message.channel.send(`I saw what you did <@${user.id}> ${react.emoji}`);
    });

    client.on("message", async (msg) => {
      if (msg.author.bot) return;
      if (!msg.mentions.has({ id: client.user.id })) return;
      if (msg.content.toLowerCase().includes("provoke our thoughts")) {
        const randomQuestion = await require("./questions").getRandomQuestion(
          msg
        );
        return msg.channel.send(randomQuestion);
      }
      if (msg.content.toLowerCase().includes("poll us")) {
        return await require("./questions").createRandomPoll(msg);
      }
      msg.reply("Please just let me exist in peace.");
    });
  });
})();
