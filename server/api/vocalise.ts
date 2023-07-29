import { createReadStream } from "fs"
import read from "~/server/service/vocalise"

const FILE_NAME = "output.m4a"
export default defineEventHandler(async (event) => {
  const transcript = await readBody(event)

  console.log(transcript)

  await read(transcript, FILE_NAME)

  const file = await sendStream(event, createReadStream(FILE_NAME))

  return file
})
