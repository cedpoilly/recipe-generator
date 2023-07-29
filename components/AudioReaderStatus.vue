<script setup lang="ts">
import { SpeakerWaveIcon } from "@heroicons/vue/20/solid"

type Props = {
  state: "idle" | "speaking" | "loading"
}

const props = defineProps<Props>()
</script>

<template>
  <div class="absolute -top-5 right-6" v-if="props.state === 'loading'">
    <span class="loading loading-bars loading-lg"></span>
  </div>
  <div class="absolute -top-5 right-6" v-if="props.state === 'speaking'">
    <SpeakerWaveIcon class="absolute z-10 h-8 w-8" />
    <div
      class="absolute h-10 w-10 -translate-x-1 -translate-y-1 bg-zinc-900 rounded-full"
    ></div>
    <div class="animate-ping h-8 w-8 bg-zinc-700 rounded-full"></div>
  </div>
</template>
