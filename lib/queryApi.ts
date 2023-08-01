import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {

    try{

        const res = await openai.createCompletion({
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
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        return res.data.choices[0].text;
    }    
    catch(err) {
        return `Chat couldnt find an answer for that (Error:${err})`}

    // return res
}

export default query