<template>
    <button class="base-button">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .base-button {
        padding: 10px 16px;
        font-size: var(--font-size);
        background-color: var(--primary-color);
        color: #ffffff;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
          
        &:hover {
            background-color: #004092;
        }
          
        &:active {
            background-color: #003380;
        }
          
        &:focus {
            outline: none;
            box-shadow: 0 0 4px rgba(0, 86, 179, 0.3);
        }
    }
</style>