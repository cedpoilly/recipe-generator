import { PathLike } from "fs"

import type { H3Event } from "h3"
import { readFiles } from "h3-formidable"

export default async function getFilePathFromEvent(event: H3Event) {
  const response = await readFiles(event, {
    // * We actually need these lines and they are actually valid. (BRUUH)
    // @ts-ignore-next-line
    multiples: true,
    uploadDir: "./",
    filename: () => {
      return `temp_${Date.now().toString()}.wav`
    },
  })

  // * Yeah the data structure is weird so I do it weird thigs to access it
  const fileObject = Object.values(response as Object).flat()[0]
  return fileObject.filepath as PathLike
}
