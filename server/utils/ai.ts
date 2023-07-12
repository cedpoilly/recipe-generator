import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const config = useRuntimeConfig()

const configuration = new Configuration({
  apiKey: config.openAi.secretKey,
})
const openai = new OpenAIApi(configuration)

type Params = { messages: ChatCompletionRequestMessage[] }

export const getChatStream = async ({ messages }: Params) => {
  const response = await openai.createChatCompletion(
    {
      max_tokens: 2048,
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages,
      stream: true,
    },
    { responseType: "stream" }
  )

  return response.data
}
