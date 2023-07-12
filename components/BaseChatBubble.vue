<script setup lang="ts">
type Props = {
  isAssistant: boolean
  content: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      props.isAssistant ? 'chat-bubble-neutral-focus' : 'chat-bubble-primary'
    "
    class="chat-bubble text-slate-50"
  >
    {{ props.content }}
  </div>
</template>
