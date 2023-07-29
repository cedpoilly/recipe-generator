export const usePlayTheAudioFile = async (audioFile: File) => {
  let audioElement: HTMLAudioElement | null = new Audio()

  audioElement.src = URL.createObjectURL(audioFile)

  if (!audioElement) {
    alert("No audio element.")
    return
  }

  await audioElement.play()

  return new Promise((resolve, reject) => {
    if (!audioElement) {
      return reject("Failed to access the audio element.")
    }

    audioElement.onended = function (event) {
      audioElement?.remove()
      audioElement = null

      resolve(true)
    }
  })
}
