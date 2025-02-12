<script lang="ts" setup>
import CatalogModeToggler from '@/components/catalog/CatalogModeToggler.vue';
import { BaseButton, BaseInput } from '@/components/base';

import { useCatalogStore } from '@/stores/catalog';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { ViewMode } from '@/types';

const catalogStore = useCatalogStore();
const { viewMode } = storeToRefs(catalogStore);
const { setFilters, setViewMode } = catalogStore;

const viewModeModel = computed({
    get: () => viewMode.value,
    set: (value: ViewMode) => setViewMode(value),
});

const search = ref<string>('');

const filterItems = () => {
    setFilters('search',  search.value );
}
</script>

<template>
    <div class="catalog-filters">
        <div class="catalog-filters__search">
            <BaseInput v-model="search" placeholder="Начните вводить..."/>

            <BaseButton @click="filterItems">
                Поиск
            </BaseButton>
        </div>

        <CatalogModeToggler v-model="viewModeModel" />
    </div>
</template>

<style lang="scss" scoped>
    .catalog-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__search {
            display: flex;
            column-gap: 16px;
            width: 300px;
        }
    }
</style>