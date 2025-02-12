import { Product } from '@/types';

export const ITEMS_PER_PAGE = 10;

export const SEARCHABLE_FIELDS: (keyof Product)[] = [
    'title',
    'description',
    'category',
    'brand',
    'sku',
    'availabilityStatus',
    'warrantyInformation',
    'shippingInformation',
    'returnPolicy',
];

export default {
    ITEMS_PER_PAGE,
    SEARCHABLE_FIELDS,
}
