<script setup lang="ts">
import { getAnswer } from "./repositories/chat"

type Message = {
  role: string
  content: string
}

const chatList = ref<HTMLUListElement>()

const messages = ref<Message[]>([])
const answer = ref<Message>()

const question = ref("")
const askQuestion = async () => {
  messages.value.push({
    role: "user",
    content: question.value,
  })

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
    onChunk: ({ data }) => {
      answer.value.content += data

      if (!chatList.value) {
        return
      }

      scrollToBottom()
    },
    onReady: () => {
      messages.value.push(answer.value)
      answer.value = null

      scrollToBottom()
    },
  })
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
  <form
    ref="theForm"
    class="max-w-screen-sm w-full h-screen grid grid-rows-[1fr_auto] mx-auto py-4"
    @submit.prevent="askQuestion"
  >
    <ul
      ref="chatList"
      class="overflow-y-auto scroll-smooth px-2 grid items-start auto-rows-min gap-y-4 pb-4 transition-all duration-700"
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

    <div
      class="w-full grid grid-cols-[1fr_auto] p-4 rounded items-end gap-x-4 bg-slate-800"
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
</template>

<style>
body {
  @apply bg-slate-900 text-slate-50;
}
</style>
