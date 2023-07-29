export const useGetFileFromStream = async (stream: ReadableStream) => {
  const parts = []
  const reader = (stream as unknown as ReadableStream).getReader()

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      parts.push(value)
    }
  } catch (error) {
    console.error("Error getting the file from readble stream:", error)
    return null
  }

  return new File([...parts], "file.mp3", {
    type: "audio/mp3",
  })
}
