import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatMistralAI } from '@langchain/mistralai';

const MISTRALALMODAL = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRALAL_API_KEY,
});

const normalizeText = (text) =>
  text
    .split('\n')[0]
    .replace(/[*"`]/g, '')
    .trim();

export const MISTRALAL = async (messages) => {
  const langchainMessages = messages.map((msg) => {
    if (msg.role === 'user') return new HumanMessage(msg.content);
    if (msg.role === 'ai') return new AIMessage(msg.content);
    return new HumanMessage(msg.content);
  });

  const response = await MISTRALALMODAL.invoke(langchainMessages);

  return response.text;
};

export const sendmessagestitle = async (message) => {
  const response = await MISTRALALMODAL.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates concise and relevant titles for user messages. Your task is to create a 3-5 word title that accurately summarizes the content of the user's message. Please ensure the title is clear, engaging, and directly related to the message provided.`
    ),
    new HumanMessage(`Generate a 3-5 word title for this first message:\n"${message}"`),
  ]);

  return normalizeText(response.text);
};
