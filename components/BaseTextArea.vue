<script setup lang="ts">
type Props = {
  modelValue: string
  placeholder: string
  label: string
}
const props = defineProps<Props>()

defineEmits(["update:modelValue"])
</script>

<template>
  <label class="w-full grid">
    <p class="text-slate-50">{{ props.label }}</p>
    <textarea
      class="textarea mt-1"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement)?.value,
        )
      "
      @keydown.ctrl.enter="$emit('submit', $event)"
    ></textarea>
  </label>
</template>
