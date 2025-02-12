<script setup lang="ts">
import CatalogItemInfoModal from '@/components/catalog/CatalogItemInfoModal.vue';
import CatalogFilters from '@/components/catalog/CatalogFilters.vue';
import CatalogItem from '@/components/catalog/CatalogItem.vue';
import { BasePagination } from '@/components/base';

import { useCatalogStore } from '@/stores/catalog';
import { ITEMS_PER_PAGE } from '@/utils/consts';
import { onMounted, ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Product } from '@/types';
import { Products } from '@/api';

const loading = ref<boolean>(true);
const catalogStore = useCatalogStore();
const focusedItem = ref<Product | null>(null);
const showItemInfoModal = ref<boolean>(false);
const { filteredProducts, viewMode, paginationParams } = storeToRefs(catalogStore);
const { setProducts, setPaginationParams } = catalogStore;

const page = computed({
    get: () => paginationParams.value.page,
    set: (value: number) => setPaginationParams({ page: value })
});

watch(page, () => {
    fetchItems();
});

const fetchItems = async () => {
    try {
        loading.value = true;
        const data = await Products.getItems({ limit: ITEMS_PER_PAGE, skip: ITEMS_PER_PAGE * (page.value - 1) });
    
        setProducts(data.products);
        setPaginationParams({ total: data.total, limit: ITEMS_PER_PAGE })
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const focusItem = (item: Product) => {
    focusedItem.value = item;
    showItemInfoModal.value = true;
}

watch(showItemInfoModal, (val) => {
    if (!val) {
        focusedItem.value = null;
    }
});

onMounted(() => {
    fetchItems();
});
</script>

<template>
    <div class="catalog">
        <CatalogFilters />

        <div :class="['catalog__list', viewMode]">
            <template v-if="loading">
                Загрузка...
            </template>
            
            <template v-else-if="filteredProducts.length">
                <CatalogItem
                    v-for="item in filteredProducts"
                    :key="item.id"
                    :item="item"
                    :view-mode="viewMode"
                    @click="focusItem(item)"
                />
            </template>

            <template v-else>
                Ничего не найдено!
            </template>
        </div>

        <BasePagination
            class="catalog__pagination"
            v-model="page"
            :total-items="paginationParams.total"
            :limit="paginationParams.limit"
        />

        <CatalogItemInfoModal
            :product="focusedItem"
            v-model="showItemInfoModal"
        />
    </div>
</template>

<style lang="scss" scoped>
    .catalog {
        padding: 0 32px;

        &__list {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 16px;

            &.list {
                flex-direction: column;
            }

            &.grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 16px;
            }
        }

        &__pagination {
            margin-top: 32px;
        }
    }
</style>