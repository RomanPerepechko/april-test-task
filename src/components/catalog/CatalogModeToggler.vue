<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';
import { ViewMode } from '@/types';

import { ListIcon, GridIcon } from '@/components/catalog/icons'; 

interface CatalogModeTogglerProps {
    modelValue: ViewMode
}
interface EmitEvents {
    (event: "update:modelValue", payload: ViewMode): void
}

const props = defineProps<CatalogModeTogglerProps>();
const emit = defineEmits<EmitEvents>();

const model = computed({
    get: () => props.modelValue,
    set: (value: ViewMode) => emit('update:modelValue', value)
})

const options = [
    {
        value: ViewMode.List,
        icon: ListIcon,
        
    },
    {
        value: ViewMode.Grid,
        icon: GridIcon,
    },
];
</script>

<template>
    <div class="mode-toggler">
        <component
            class="mode-toggler__option"
            :class="{ active: model === option.value }"
            v-for="option in options"
            :is="option.icon"
            @click="model = option.value"
        />
    </div>
</template>

<style lang="scss" scoped>
    .mode-toggler {
        display: flex;
        column-gap: 8px;

        &__option {
            color: var(--text-color);
            cursor: pointer;

            &.active {
                color: var(--primary-color);
            }
        }
    }
</style>