<script setup lang="ts">
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/vue/20/solid"

const emits = defineEmits(["change"])
function emitChange() {
  emits("change")
}
</script>

<template>
  <label class="swap">
    <input type="checkbox" @click="emitChange" />
    <div class="swap-on">
      <SpeakerWaveIcon class="h-8 w-8" />
    </div>
    <div class="swap-off">
      <SpeakerXMarkIcon class="h-8 w-8" />
    </div>
  </label>
</template>
