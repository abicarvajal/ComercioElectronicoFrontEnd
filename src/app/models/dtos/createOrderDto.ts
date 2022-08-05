export interface CreateOrderDto {
    code: string;
    deliveryMethodId: string;
    itemsToCart: CreateCartItemDto[];
}

export interface CreateCartItemDto {
    code: string;
    productId: string;
    quantity: number;
}