<script setup lang="ts">
type Props = {
  role: string
}

const props = defineProps<Props>()

const firstLetter = computed(() => {
  if (!props.role?.length) {
    return
  }

  return props.role.charAt(0).toUpperCase()
})
</script>

<template>
  <div class="avatar placeholder h-10 w-10">
    <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
      <span class="text-2xl">{{ firstLetter }}</span>
    </div>
  </div>
</template>
