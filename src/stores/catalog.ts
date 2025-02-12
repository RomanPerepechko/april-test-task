import { Product, ViewMode, PaginationParams } from '@/types';
import { ITEMS_PER_PAGE, SEARCHABLE_FIELDS } from '@/utils/consts';
import { reactive, ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface Filters {
    [search: string]: string,
};

export const useCatalogStore = defineStore('catalog', () => {
    const filters = reactive<Filters>({
        search: '',
    });

    const paginationParams = ref<PaginationParams>({
        limit: ITEMS_PER_PAGE,
        total: 0,
        page: 1,
    });

    const products = ref<Product[]>([]);
    const viewMode = ref<ViewMode>(ViewMode.Grid);

    const filteredProducts = computed(() => {
        if (!filters.search) {
            return products.value;
        }

        const query = filters.search.toLowerCase()

        return products.value.filter((product) => {
            return (
                SEARCHABLE_FIELDS.some((field) => {
                    const value = product[field];
                    return typeof value === 'string' && value.toLowerCase().includes(query);
                }) ||
                (Array.isArray(product.tags) && product.tags.some((tag) => tag.toLowerCase().includes(query)))
            );
        });
    });

    const setFilters = (key: keyof Filters, value: string) => {
        if (key) {
            filters[key] = value;
        }
    }

    const setProducts = (items: Product[]) => {
        products.value = [...items];
    }

    const setPaginationParams = (payload: Partial<PaginationParams>) => {
        paginationParams.value = {
            ...paginationParams.value,
            ...payload,
        };
    }

    const setViewMode = (mode: ViewMode) => {
        viewMode.value = mode;
    }

    return {
        filters,
        setFilters,
        setProducts,
        products,
        filteredProducts,
        viewMode,
        setViewMode,
        setPaginationParams,
        paginationParams,
    };
})
