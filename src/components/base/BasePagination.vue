<script setup lang="ts">
import { computed } from 'vue';

interface BasePaginationProps {
    modelValue: number;
    totalItems: number;
    limit: number;
}

interface EmitEvents {
    (event: "update:modelValue", payload: number): void;
}

const props = defineProps<BasePaginationProps>();

const emit = defineEmits<EmitEvents>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.limit));

const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        emit('update:modelValue', page);
    }
};

const pages = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});
</script>

<template>
  <nav class="base-pagination">
    <button
        class="base-pagination__button"
        @click="setPage(modelValue - 1)"
        :disabled="modelValue === 1"
    >
        «
    </button>

    <button
        class="base-pagination__button"
        v-for="page in pages"
        :key="page"
        @click="setPage(page)"
        :class="{ active: page === modelValue }"
    >
        {{ page }}
    </button>

    <button
        class="base-pagination__button"
        @click="setPage(modelValue + 1)"
        :disabled="modelValue === totalPages"
    >
        »
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.base-pagination {
    display: flex;
    align-items: center;
    gap: 8px;

    &__button {
        padding: 6px 12px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;

        &:hover {
            background: #f0f0f0;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
    }
}
</style>
