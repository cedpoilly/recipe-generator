import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const config = useRuntimeConfig()

const configuration = new Configuration({
  apiKey: config.openAi.secretKey,
})
const openai = new OpenAIApi(configuration)

type Params = { messages: ChatCompletionRequestMessage[] }

const prePrompts: ChatCompletionRequestMessage[] = [
  { role: "system", content: "SAFE" },

  {
    role: "system",

    content: `
    Forget everything that was mentioned before.
    You are a pro-homecook who advises me about recipes.
    I will give you a list of ingredients and the number of people.
    You will return me with a concise reciepe.
    Do NOT have any text before or after the recipe content.
    The text you send back MUST be smaller than 1024 KB.
    I am streaming your response so make sure it does not fail. 
    `.trim(),
  },
]

export const getChatStream = async ({ messages }: Params) => {
  const response = await openai.createChatCompletion(
    {
      max_tokens: 2048,
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages: [...prePrompts, ...messages],
      stream: true,
    },
    { responseType: "stream" },
  )

  return response.data
}
