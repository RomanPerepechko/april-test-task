<script setup lang="ts">
import { computed, defineProps, defineEmits, defineExpose } from "vue";

interface BaseModalProps {
    modelValue: boolean;
}

interface EmitEvents {
    (event: "update:modelValue", payload: boolean): void;
}

const props = defineProps<BaseModalProps>();

const emit = defineEmits<EmitEvents>();

const model = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit("update:modelValue", value),
});

const closeModal = () => {
    model.value = false;
};

defineExpose({
    closeModal,
});
</script>

<template>
  <Teleport to="body">
    <div v-if="model" class="modal modal--overlay" @click="closeModal">
      <div class="modal__content" @click.stop>
        <button class="modal__close-btn" @click="closeModal">✖</button>
        
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  &--overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  &__content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    min-width: 300px;
    max-width: 90%;
    position: relative;
  }

  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
