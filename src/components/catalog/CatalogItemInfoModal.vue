<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue';
import { Product } from '@/types';

import { BaseModal } from '@/components/base';

interface InfoModalProps {
    product: Product | null;
    modelValue: boolean;
}

interface EmitEvents {
    (event: "update:modelValue", value: boolean): void
}

const emit = defineEmits<EmitEvents>();
const props = defineProps<InfoModalProps>();

const model = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<template>
    <BaseModal v-model="model">
        <div v-if="product" class="item-info__content">
            <h4>
                Дополнительные характеристики товара:
            </h4>
            
            <ul>
                <li>Бренд: {{ product.brand }}</li>
                <li>Артикул (SKU): {{ product.sku }}</li>
                <li>Вес: {{ product.weight }} г</li>
                <li>
                    Размеры (Ш × В × Г):

                    {{ product.dimensions.width }} ×
                    {{ product.dimensions.height }} ×
                    {{ product.dimensions.depth }} мм
                </li>
                <li>Гарантия: {{ product.warrantyInformation }}</li>
                <li>Доставка: {{ product.shippingInformation }}</li>
                <li>Наличие: {{ product.availabilityStatus }}</li>
                <li>Скидка: {{ product.discountPercentage }}%</li>
                <li>Мин. заказ: {{ product.minimumOrderQuantity }} шт</li>
                <li>
                    Теги: 
                    <span class="tag">{{ product.tags.join(', ') }}</span>
                </li>
            </ul>
        </div>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .item-info {
        &__content {
            width: 600px;
            padding: 16px;
        }
          
        ul {
            list-style: none;
            padding: 0;
            margin-block-start: 4px;
        }
          
        ul li {
            padding: 5px 0;
        }
    }
</style>