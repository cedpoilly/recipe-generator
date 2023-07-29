import { createReadStream, PathLike } from "fs"

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export async function transcribeFile(path: PathLike) {
  let response
  let error

  try {
    const transcription = await openai.createTranscription(
      // * Casting the stream as `File` as the definition seems wrong (or does work with a stream)
      createReadStream(path) as unknown as File, // The audio file to transcribe.
      "whisper-1", // The model to use for transcription.
      undefined, // The prompt to use for transcription.
      "json", // The format of the transcription.
      1, // Temperature
      "en", // Language
    )

    response = transcription.data.text
  } catch (caughtError) {
    error = caughtError
    console.error("caughtError:", caughtError)
  }

  return { response, error }
}
