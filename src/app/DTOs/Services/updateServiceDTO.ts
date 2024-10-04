export class UpdateServiceDTO {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    imagePath: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    isHaveDiscount: Boolean | undefined;
    disacountAmount: number | undefined;
    discountType: string | undefined;
    categoryID: number | undefined;
}