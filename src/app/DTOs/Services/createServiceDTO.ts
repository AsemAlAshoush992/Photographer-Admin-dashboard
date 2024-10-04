export class CreateServiceDTO {
    name: string | undefined;
    description: string | undefined;
    imagePath: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    isHaveDiscount: boolean | undefined;
    disacountAmount: number | undefined;
    discountType: string | undefined;
    categoryID: number | undefined;
}