import { getChatStream } from "../utils/ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  console.log("receieved the messages", messages)

  const stream = await getChatStream({ messages })
  console.log(stream)

  return sendStream(event, stream)
})
