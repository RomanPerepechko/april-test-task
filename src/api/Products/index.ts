import { Product } from '@/types';
import http from '@/api/http';

interface GetItemsParams {
    limit: number;
    skip: number;
}

interface GetItemsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const getItems = async (params: GetItemsParams): Promise<GetItemsResponse> => {
    try {
        const { data } = await http.get<GetItemsResponse>('/products', { params });

        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Could not fetch products');
    }
};

export default {
    getItems,
};