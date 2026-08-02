
import { ChatMistralAI } from '@langchain/mistralai';

const MISTRALALMODAL = new ChatMistralAI({
  model: 'mistral-large-latest',
  apiKey: process.env.MISTRALAL_API_KEY,
});


export const MISTRALAL=async(messages)=>{


  const response = await MISTRALALMODAL.invoke(messages);

  console.log(response.text)

}
