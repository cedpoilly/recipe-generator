<script setup lang="ts">
type Props = {
  role: string
  content: string
}

const props = defineProps<Props>()
const isAssistant = computed(() => {
  if (!props.role) {
    return false
  }

  return props.role.toLocaleLowerCase() === "assistant"
})
</script>

<template>
  <div
    :class="{
      'chat chat-start': isAssistant,
      'chat chat-end flex flex-row-reverse': !isAssistant,
    }"
  >
    <BaseAvatar :role="props.role" />
    <BaseChatBubble :is-assistant="isAssistant" :content="props.content" />
  </div>
</template>

<style scoped></style>
