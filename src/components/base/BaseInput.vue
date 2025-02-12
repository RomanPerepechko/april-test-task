<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface BaseInputProps {
    modelValue: string,
    placeholder: string
}

interface EmitEvents {
    (event: "update:modelValue", value: string): void
}

const props = defineProps<BaseInputProps>();
const emit = defineEmits<EmitEvents>();

const model = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
    <input
        class="base-input"
        v-model="model"
        :placeholder="placeholder"
        type="text"
    >
</template>

<style lang="scss" scoped>
    .base-input {
        width: 100%;
        padding: 10px 12px;
        font-size: var(--font-size);
        color: var(--text-color);
        background-color: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        transition: border-color 0.3s ease;
        outline: none;
          
        &:focus {
            border-color: var(--focus-border-color);
            box-shadow: 0 0 4px rgba(0, 86, 179, 0.3);
        }
    }
</style>