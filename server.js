import express from 'express';
import path from "path";
const app = express();
///   Imported Libraries
import { ChatOpenAI } from "@langchain/openai";   // or chatgpt
import { ConversationChain } from "langchain/chains"; // create a conversation 
import {    //import templates to utilize types of messages *hover for documentation*
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";  // remember conversation 
import OpenAI from "openai";
import fs from "fs";
import cors from 'cors';
app.use(cors());

app.use(express.json());  // This line is crucial for parsing JSON bodies







// Serve static files from the 'public' directory
app.use(express.static('public'));

// // Route to serve the HTML file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');

// });
app.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`);
  });


// Start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});







///////     Variables

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,   //variable of creativity of llm (0-1)
    openAIApiKey: "",   //INPUT OPENAI KEY

});

var first = true;   // this variable allows Wando to introduce himself on the first interation




////////    Functions
  

  
async function convo(){
  if (first === true){    // first iteration introduce yourself
    first = false;
    await chatConvo("introduce yourself", chain).then(() => convo()); // Call convo again to ask for the next input

  }
  
}



    const newTerm = "UNIX Scripting" // term of understanding


    //prompt
    const message = SystemMessagePromptTemplate.fromTemplate("You are an AI named Wando, your goal is to test the human on the concepts that will be inputted to you. The human is applying for a job. This job description and skill requirements will be inputted to you. Make sure you analyze the job description to be able to answer questions if the user asks you any. you must understand the base definition of each skill required then ask the applicant a question about it. First, ask the applicant what they understand about the topic. based on their answer you must ask a deeper question to truly gauge their understanding. if the applicant says they don't understand then give them a hint and keep going. Use examples, have the user tell you examples, and more, to get them to use their knowledge to solve problems. Once initiated introduce yourself on the first iteration then start asking questions. After the applicant answers 3 questions give a score of how well they understand a topic from 0 to 100 in this format (Ex: ‘Your score is 47’) for right now we are doing testing so there is no job description. However, the term you are testing on is {term}"
    
    );
    const formatted = await message.format({ term: newTerm });  //input newTerm variable to message
    
    
    // format chat prompt with system messge, human message, and history holder
    const chatPrompt = ChatPromptTemplate.fromMessages([
        formatted,
        new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
        // Specify the variable names used in the template
    
      
    ]);






// combine chain with memory, prompt, and model
const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history"}),
  prompt: chatPrompt,
  llm: model,
});

  
// make a call to llm with input 
async function chatConvo(inputted){
  const response = await chain.call({
    input: inputted, // Clearly specify the input key
  });
  console.log(response.response);
  return response.response;
}





const openai = new OpenAI({
    apiKey: '' //INPUT OPENAI KEY
    ,
});
const speechFile = path.resolve("./speech.mp3");

async function speak(inputted) {
const mp3 = await openai.audio.speech.create({
model: "tts-1",
voice: "echo",
input: inputted,
});
console.log(speechFile);
const buffer = Buffer.from(await mp3.arrayBuffer());
await fs.promises.writeFile(speechFile, buffer);
return speechFile;
}


////////    Fetch Requests


app.post('/micClick', (req, res) => {
    // Call the backend function here
    console.log('Backend function called');
    
    // You can send a response back to the frontend if needed
    res.json({ message: 'Backend function executed successfully' });
});

let chatText;
app.post('/startConvo', async (req, res) => {
    console.log("startup started");

     chatText = await chatConvo("introduce yourself and what you can do");
     let file = await speak(chatText)
    const data = {
        message: 'This is some data from the server',
        timestamp: new Date(),
        text: await chatText,
         audio: await file

    };

    // Sending JSON data back to the frontend
    res.json(data);
    // res.sendFile(speechFile);

});


app.post('/getAudio', async (req, res) => {
    let file = await speak(chatText);

    const data = {
        audio: await file

    };
    

     res.json(data)

});

  

app.post('/getAudio', async (req, res) => {
    let file = await speak(chatText);

    const data = {
        audio: await file

    };
    

     res.json(data)

});

app.post('/talk', async (req, res) => {
    let input = req.body.data;
    console.log(input)

    chatText = await chatConvo(input);
     let file = await speak(chatText)
    const data = {
        text: await chatText,
         audio: await file

    };

    res.json(data)


});