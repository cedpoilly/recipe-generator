<script setup lang="ts">
import { useGetFileFromStream } from "~/composables/getFileFromStream"
import { getAnswer } from "./repositories/chat"

type Message = {
  role: string
  content: string
}

const questionAksked = ref(false)

const chatList = ref<HTMLUListElement>()

const messages = ref<Message[]>([])
const answer = ref<Message | null>()

const audioParrotFile = ref()
const parrotStatus = ref()

const question = ref("")

const askQuestion = async () => {
  messages.value.push({
    role: "user",
    content: question.value,
  })

  questionAksked.value = true

  scrollToBottom()

  question.value = ""
  const messagesCopy = [...messages.value]
  const stream = await getAnswer({ messages: messagesCopy })

  answer.value = {
    role: "assistant",
    content: "",
  }

  useChatStream({
    stream,
    onChunk: ({ data }: any) => {
      if (!answer.value) {
        alert("Yo some' went wrong bruh! Tell that dude who wrote dat thing.")
        return
      }

      answer.value.content += data

      if (!chatList.value) {
        return
      }

      scrollToBottom()
    },
    onReady: () => {
      if (!answer.value) {
        alert("Yo some' went wrong bruh! Tell that dude who wrote dat thing.")
        return
      }

      messages.value.push(answer.value)

      requestAndPlayAudio(answer.value.content)

      answer.value = null

      scrollToBottom()
    },
  })
}

async function requestAndPlayAudio(text: string) {
  const response = await $fetch("/api/vocalise", {
    method: "POST",
    body: text,
    responseType: "stream",
  })

  if (!((response as any) instanceof ReadableStream)) {
    alert(response as unknown as Error)
    console.log(response)
    return
  }

  audioParrotFile.value = await useGetFileFromStream(
    response as unknown as ReadableStream,
  )

  if (!audioParrotFile.value) {
    alert("Failed to get the audio file!")
    return
  }

  parrotStatus.value = "speaking"

  await usePlayTheAudioFile(audioParrotFile.value)

  parrotStatus.value = "sleeping"
}

async function scrollToBottom() {
  if (!chatList.value) {
    return
  }

  await nextTick()

  chatList.value.scrollTop = chatList.value?.scrollHeight
}
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr_auto]">
    <header class="mx-auto px-2 max-w-screen-sm w-full">
      <h1 class="text-xl mt-[1em] font-black text-center">
        Fridge to Recipe Bot
      </h1>

      <h2 class="text-lg mt-[1em] font-bold text-center">
        Tell me what you have in the frige, I'll tell you what to cook.
      </h2>
    </header>

    <ul
      ref="chatList"
      class="overflow-y-auto scroll-smooth overscroll-y-contain px-2 grid items-start auto-rows-min gap-y-4 pb-4 transition-all duration-700"
    >
      <ChatLine
        :role="message.role"
        :content="message.content"
        v-for="message in messages"
      />
      <ChatLine
        data-answer
        v-if="answer"
        :role="answer.role"
        :content="answer.content"
      />
    </ul>

    <form
      ref="theForm"
      class="max-w-screen-sm w-full h-fit items-end grid grid-rows-[auto_auto] mx-auto"
      @submit.prevent="askQuestion"
    >
      <Transition name="appear">
        <div v-if="!questionAksked" class="px-2">
          <p
            class="bg-teal-900/40 mb-2 outline-2 outline-slate-50/50 h-fit py-4 -outline-offset-[8px] outline-dashed px-6 rounded-lg flex items-center"
          >
            Let us know the ingredients that you have at hand and how many
            people you are cooking for. We will provide you with an easy-to-make
            recipe.
          </p>
        </div>
      </Transition>

      <div
        class="w-full grid grid-cols-[1fr_auto] p-4 items-end gap-x-4 bg-slate-800"
      >
        <BaseTextArea
          v-model="question"
          class="w-full"
          label="Enter your message here"
          placeholder="Write here..."
          @submit="askQuestion"
        />
        <BaseButton type="submit">Ask</BaseButton>
      </div>
    </form>
  </div>
</template>

<style>
body {
  @apply bg-slate-900 text-slate-50;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 0.3s ease;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
  transform: scale(0.9, 0.9);
}
</style>
