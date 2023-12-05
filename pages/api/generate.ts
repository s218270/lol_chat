import { OpenAIStream } from "@/utils/OpenAIStream";
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect'

export const config = {
    runtime: "edge",
  };


  const handler = async (req: Request, res: NextApiResponse): Promise<Response> => {
      
      const { prompt, champion } = (await req.json()) as {
          prompt?: string;
          champion?: string;
        };

  
    const payload = {
      model: "gpt-3.5-turbo-1106",
      messages: prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 4000,
      stream: true,
      n: 1,
    };
  
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  };
  
  export default handler;