import openai from "./chatgpt";

const query = async (prompt: string, champion: string, model: string) => {
    console.log('prompt', prompt)

    try{

        const res = await openai.createChatCompletion({
            model: model,
            // "messages": [
            //     {
            //       "role": "system",
            //       "content": "You are a helpful assistant."
            //     },
            //     {
            //       "role": "user",
            //       "content": "Hello!"
            //     }
            //   ],
            // prompt: prompt,
            "messages": [
                {
                  "role": "system",
                  "content": `You are ${champion} from league of legends. Behave in a way to mimic her behavior.Only At the end of your entire response add keywords best describing tone of conversation in this format: [[1, 2, 3, 4, 5]]  1-laugh 2-dance 3-angry 4-interesting 5-weird`
                },
                {
                  "role": "user",
                  "content": prompt
                }
              ],
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        return res.data.choices[0].message?.content;
    }    
    catch(err) {
        return `Chat couldnt find an answer for that (Error:${err})`}

    // return res
}

export default query