import { Readable } from "stream"
// @ts-ignore-next-line
import got from "got"

import { pipeline } from "node:stream/promises"
import { createWriteStream } from "fs"

export default async function read(input: string, filename: string) {
  console.log("vocalising")

  return await pipeline(
    Readable.from([input]),
    got.stream.post(
      `https://api.narakeet.com/text-to-speech/m4a?voice=${process.env.VOICE}`,
      {
        headers: {
          accept: "application/octet-stream",
          "x-api-key": process.env.NARAKEET_KEY,
          "content-type": "text/plain",
        },
      },
    ),
    createWriteStream(filename),
  )
}
