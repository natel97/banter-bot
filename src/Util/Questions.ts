import { Message, Presence } from "discord.js";

const questions = [
    "What was the most disapointing movie you've watched?",
    "What was a food that you've tried that was unexpectedly good?",
    "What is your go to meal when you get fast food?",
    "What is something you've been slacking at that you want to improve?",
    "Which superhero is <@{{randomUserId}}> most like?",
    "If <@{{randomUserId}}> were a sandwich, which sandwich would they be?",
    "If <@{{randomUserId}}> could fly, where would they go first?",
    "Which movie character is <@{{randomUserId}}> like the most?",
];

const polls = [
    "Would you feel save as a passenger while <@{{randomUserId}}> is driving?",
    "Can <@{{randomUserId}}> tell good jokes?",
    "Is <@{{randomUserId}}> afraid of heights?",
];

export async function getRandomQuestion(msg: Message) {
    const index = Math.floor(Math.random() * questions.length);
    const question = questions[index];
    const tokens = getTokens(question);
    const parsed = await parseTokens(tokens, msg);
    const fullMsg = buildParsedMessage(question, parsed);
    return fullMsg;
}

function buildParsedMessage(str: string, obj: any) {
    let newStr = str;
    Object.keys(obj).forEach(
        (key) => (newStr = newStr.replace(`{{${key}}}`, obj[key]))
    );
    return newStr;
}

function getTokens(string: string) {
    const match = string.match(/{{\S+}}/g) ?? [];
    return match.map((dirty) => dirty.slice(2, dirty.length - 2));
}

async function singleToken(str: string, msg: Message) {
    switch (str) {
        case "randomUserId":
            if (!msg.guild) return msg.author.id;
            const members = await msg.guild.members.fetch({ withPresences: true });
            // Trying to only tag people online, but it's an empty array because the presence isn't getting pulled in??
            // console.log({ members: members.toJSON(), matching: members.filter(x => x.presence.status !== 'offline').toJSON(), rando: members.randomKey() })
            return members/*.filter(x => x.presence.status !== 'offline')*/.randomKey;
    }
}

async function parseTokens(tokenArray: any[], msg: Message) {
    const obj: any = {};
    for (let item of tokenArray) {
        obj[item] = await singleToken(item, msg);
    }
    return obj;
}

export async function createRandomPoll(msg: Message) {
    const index = Math.floor(Math.random() * polls.length);
    const poll = polls[index];
    const tokens = getTokens(poll);
    const parsed = await parseTokens(tokens, msg);
    const fullMsg = buildParsedMessage(poll, parsed);
    const newMsg = await msg.channel.send(fullMsg);
    newMsg.react("👍");
    newMsg.react("👎");
}
