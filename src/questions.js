const questions = [
    "What was the most disapointing movie you've watched?",
    "What was a food that you've tried that was unexpectedly good?",
    "What is your go to meal when you get fast food?",
    "What is something you've been slacking at that you want to improve?",
    "Which superhero is <@{{randomUserId}}> most like?",
    "If <@{{randomUserId}}> were a sandwich, which sandwich would they be?",
    "If <@{{randomUserId}}> could fly, where would they go first?",
    "Which movie character is <@{{randomUserId}}> like the most?",
]

const polls = [
    "Would <@{{randomUserId}}> win in a fight against a bear?",
    "Can <@{{randomUserId}}> tell good jokes?",
    "Is <@{{randomUserId}}> reliable?"
]

async function getRandomQuestion(msg) {
    const index = Math.floor(Math.random() * questions.length);
    const question = questions[index];
    const tokens = getTokens(question)
    const parsed = await parseTokens(tokens, msg)
    const fullMsg = buildParsedMessage(question, parsed)
    console.log({ index, question, tokens, parsed, fullMsg })
    return fullMsg
}

function buildParsedMessage(str, obj) {
    let newStr = str;
    Object.keys(obj).forEach(key => newStr = newStr.replace(`{{${key}}}`, obj[key]))
    return newStr
}

function getTokens(string) {
    const match = string.match(/{{\S+}}/g) ?? []
    return match.map(dirty => dirty.slice(2, dirty.length - 2));
}

async function singleToken(str, msg) {
    switch (str) {
        case "randomUserId":
            if (!msg.guild) return msg.author.id;
            const members = await msg.guild.members.fetch()
            return members.random().id;
    }
}

async function parseTokens(tokenArray, msg) {
    const obj = {};
    for (let item of tokenArray) {
        obj[item] = await singleToken(item, msg)
    }
    return obj
}

async function createRandomPoll(msg) {
    const index = Math.floor(Math.random() * polls.length)
    const poll = polls[index]
    const tokens = getTokens(poll)
    const parsed = await parseTokens(tokens, msg)
    const fullMsg = buildParsedMessage(poll, parsed)
    const newMsg = await msg.channel.send(fullMsg)
    newMsg.react('👍')
    newMsg.react('👎')

}


module.exports = {
    getRandomQuestion,
    createRandomPoll
}