# WandoAI: Intelligent Interview Prep AI  

## Overview  

**WandoAI** is an AI-powered interview preparation assistant designed to test a user's knowledge on key concepts and skills. Built using **LangChain**, **OpenAI's GPT**, and **text-to-speech (TTS) models**, WandoAI dynamically engages users in a conversation, assessing their understanding and providing a score based on their responses. It was developed as a solution for **interactive AI-driven learning and job interview preparation**.  

WandoAI simulates **real-world technical interviews** by analyzing job descriptions and crafting customized questions based on required skills. It deepens the conversation by prompting users for explanations, providing hints if needed, and refining understanding through iterative questioning.  

## Key Features  

- **AI-Powered Conversation**: Uses **ChatGPT (GPT-3.5 Turbo)** via LangChain to generate and analyze interview-style questions.  
- **Dynamic Knowledge Testing**: Asks deeper questions based on user responses to gauge understanding.  
- **Scoring System**: After three questions, assigns a knowledge score (0-100) to measure proficiency in a topic.  
- **Text-to-Speech Support**: Converts AI-generated responses to speech using OpenAI's TTS.  
- **Customizable Topics**: Allows input of new skills and concepts for tailored interview practice.  
- **Real-Time Interaction**: Backend API supports interactive user sessions via HTTP requests.  

## Technologies Used  

- **Backend**: Node.js (Express.js)  
- **AI & NLP**: OpenAI's **GPT-3.5 Turbo**, LangChain  
- **Memory & Context Tracking**: BufferMemory from LangChain  
- **Text-to-Speech (TTS)**: OpenAI's speech API  
- **Frontend Compatibility**: JSON-based API responses, CORS enabled  

## Installation  

### Clone the Repository  

```bash
git clone https://github.com/Th1sJustIn/WandoAI.git
cd WandoAI
