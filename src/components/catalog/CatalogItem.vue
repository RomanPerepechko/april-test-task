<script lang="ts" setup>
import BaseButton from '@/components/base/BaseButton.vue';

import { defineProps } from 'vue';
import { Product, ViewMode } from '@/types';

interface CatalogItemProps {
    item: Product,
    viewMode: ViewMode,
}

defineProps<CatalogItemProps>();
</script>

<template>
    <div :class="['catalog-item', viewMode]">
        <img class="catalog-item__image" :src="item.thumbnail" :alt="item.title">

        <div class="catalog-item__content">
            <h3 class="catalog-item__title">
                {{ item.title }}
    
                <span class="catalog-item__price">
                    <span>{{ item.price }}</span>$
                </span>
            </h3>
    
            <p class="catalog-item__description">
                {{ item.description }}
            </p>
    
            <BaseButton class="catalog-item__button" @click.stop>
                Купить
            </BaseButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .catalog-item {
        background-color: var(--card-bg-color);
        border-radius: var(--border-radius);
        box-shadow: var(--card-shadow);
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;

        &.list {
            width: 700px;
            flex-direction: row;
        }

        &__image {
            width: 100%;
            max-width: 268px;
            height: 268px;
            border-radius: var(--border-radius);
        }

        &__content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        &__title {
            width: 100%;
            display: flex;
            column-gap: 4px;
            justify-content: space-between;
            font-size: 18px;
            color: var(--text-color);
            margin: 10px 0;
        }

        &__description {
            font-size: 14px;
            color: #666;
            margin: 5px 0;
        }

        &__price {
            font-size: 20px;
            font-weight: bold;
            color: var(--primary-color);
        }

        &__availability {
            font-size: 14px;
            color: red;
        }

        &__button {
            margin-top: auto;
            width: 100%;
        }
    }
</style>