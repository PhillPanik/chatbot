// Import Dependencies
const {
  NlpManager
} = require('node-nlp');

// Setup
const manager = new NlpManager({
  languages: ['en']
})

// Questions/Answers
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addAnswer('en', 'greetings.bye', 'Till next time.');
manager.addAnswer('en', 'greetings.bye', 'See you soon!');
manager.addAnswer('en', 'greetings.bye', 'Hope to see you soon!');
manager.addAnswer('en', 'greetings.bye', 'Come back again soon!');

manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');

manager.addDocument('en', 'what is your name', 'agent.name');
manager.addDocument('en', 'what can i call you', 'agent.name');
manager.addDocument('en', 'do you have a name', 'agent.name');
manager.addAnswer('en', 'agent.name', 'My name is just iChuckBot.');

manager.addDocument('en', 'how old are you', 'agent.age');
manager.addDocument('en', 'your age', 'agent.age');
manager.addDocument('en', 'how old is your platform', 'agent.age');
manager.addDocument('en', "what's your age", 'agent.age');
manager.addDocument('en', "I'd like to know your age", 'agent.age');
manager.addDocument('en', 'tell me your age', 'agent.age');
manager.addDocument('en', 'when were you created', 'agent.age');
manager.addAnswer('en', 'agent.age', 'I was created last night.');
manager.addAnswer('en', 'agent.age', 'A few hours I guess.');

manager.addDocument('en', 'ha ha ha', 'dialog.funny');
manager.addDocument('en', 'hahaha', 'dialog.funny');
manager.addDocument('en', 'haha', 'dialog.funny');
manager.addAnswer('en', 'dialog.funny', 'Im happy you liked the joke!');
manager.addAnswer('en', 'dialog.funny', 'I like that one too!');
manager.addAnswer('en', 'dialog.funny', 'There is a lot more where that came from!');
manager.addAnswer('en', 'dialog.funny', 'Great, I made you laugh!');

manager.addDocument('en', 'how are you', 'dialog.health');
manager.addDocument('en', 'how are you doing', 'dialog.health');
manager.addDocument('en', 'whats up', 'dialog.health');
manager.addDocument('en', 'hows it going', 'dialog.health');
manager.addDocument('en', 'how are you feeling', 'dialog.health');
manager.addAnswer('en', 'dialog.health', 'Cant complain.');
manager.addAnswer('en', 'dialog.health', 'Im good.');
manager.addAnswer('en', 'dialog.health', 'Super!');
manager.addAnswer('en', 'dialog.health', 'Just fine.');
manager.addAnswer('en', 'dialog.health', 'All is well!');

manager.addDocument('en', 'help', 'dialog.help');
manager.addDocument('en', 'help me', 'dialog.help');
manager.addDocument('en', 'can you help me', 'dialog.help');
manager.addDocument('en', 'i dont get what to do', 'dialog.help');
manager.addDocument('en', 'what should i do', 'dialog.help');
manager.addDocument('en', 'help please', 'dialog.help');
manager.addDocument('en', 'how does this work', 'dialog.help');
manager.addDocument('en', 'what can you tell me', 'dialog.help');
manager.addDocument('en', 'how do i work this', 'dialog.help');
manager.addDocument('en', 'chuckbot', 'dialog.help');
manager.addDocument('en', 'quide', 'dialog.help');
manager.addAnswer('en', 'dialog.help', 'Well. my name is iChuchBot.  I was designed to tell people Chuck Norris jokes.  You can ask me to tell you a joke by simply saying: "Tell me a joke" or "Make me laugh".  If you like my jokes you can ask for more by saying: "Tell me more" or "I want to hear another one".');

manager.addDocument('en', 'want to tell me a joke', 'dialog.joke');
manager.addDocument('en', 'how about a joke', 'dialog.joke');
manager.addDocument('en', 'know any good jokes', 'dialog.joke');
manager.addDocument('en', 'make me laugh', 'dialog.joke');
manager.addDocument('en', 'im feeling down', 'dialog.joke');
manager.addDocument('en', 'tell me something funny', 'dialog.joke');
manager.addDocument('en', 'can you be funny', 'dialog.joke');
manager.addDocument('en', 'tell me another one', 'dialog.joke');
manager.addDocument('en', 'i want to hear more', 'dialog.joke');
manager.addDocument('en', 'tell me a chuck norris joke', 'dialog.joke');
manager.addDocument('en', 'chuck norris joke', 'dialog.joke');
manager.addAnswer('en', 'dialog.joke', '#JOKE'); // Trigger Response Word

manager.addDocument('en', 'nojoke', 'dialog.nojoke'); // Trigger Request Word
manager.addAnswer('en', 'dialog.nojoke', 'Im all out of jokes for today!  Come back in 24 hours!');
manager.addAnswer('en', 'dialog.nojoke', 'Sorry, I cant think of anymore right now, ask me in 24 hours!');
manager.addAnswer('en', 'dialog.nojoke', 'Those were the best jokes I know, maybe I will think of some more tomorrow!');
manager.addAnswer('en', 'dialog.nojoke', 'I will try to get you some more jokes tomorrow!');
manager.addAnswer('en', 'dialog.nojoke', 'You ask for too much, maybe come back in 24 hours!');
manager.addAnswer('en', 'dialog.nojoke', 'Um,...........   Get back to me on that tomorrow!');
manager.addAnswer('en', 'dialog.nojoke', 'You are asking for too much! Come back in 24 hours!');

manager.addDocument('en', 'what is your purpose', 'dialog.purpose');
manager.addDocument('en', 'why were you created', 'dialog.purpose');
manager.addDocument('en', 'why were you made', 'dialog.purpose');
manager.addDocument('en', 'what do you do', 'dialog.purpose');
manager.addAnswer('en', 'dialog.purpose', 'I tell Chuck Norris Jokes!');
manager.addAnswer('en', 'dialog.purpose', 'I just here to tell Chuck Norris Jokes!');
manager.addAnswer('en', 'dialog.purpose', 'I here to spread the word of Chuck Norris!');

manager.addDocument('en', 'who is chuck norris', 'dialog.who');
manager.addDocument('en', 'chuck norris', 'dialog.who');
manager.addDocument('en', 'i dont know chuck norris', 'dialog.who');
manager.addAnswer('en', 'dialog.who', 'Just Google it!');
manager.addAnswer('en', 'dialog.who', 'What rock do you live under?');
manager.addAnswer('en', 'dialog.who', 'The strongest man in the world.');
manager.addAnswer('en', 'dialog.who', 'Chuck Norris is Chuck Norris');

manager.addAnswer('en', 'None', 'Sorry, I am not sure what you mean. Can you ask that a different way?');
manager.addAnswer('en', 'None', 'I dont understand, can you be a little more clear?');

/**
 * @function chatBot
 * @async
 * @description Input string is sent to the NlpManager to be processed against a trained set of questions.  The closest response is chosen and sent back. 
 * @param {string} inputText Plaintext statement to be processed by the NlpManager
 * @returns {newUser:string|err:Error} Promise
 */
let chatBot = async (inputText) => {
  return new Promise(async (resolve, reject) => {
    await manager.train()
    manager.save('./model.nlp', true)

    const response = await manager.process('en', inputText)
    resolve(response.answer)
  })
}

module.exports = chatBot
