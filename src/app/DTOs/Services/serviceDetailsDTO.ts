export class ServiceDetailsDTO {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    imagePath: string | undefined;
    price: string | undefined;
    quantity: number | undefined;
    isHaveDiscount: Boolean | undefined;
    disacountAmount: number | undefined;
    discountType: string | undefined;
    categoryID: number | undefined;
    isDeleted: Boolean | undefined;

    constructor(
        Id?: number,
        Name?: string,
        Description?: string,
        ImagePath?: string,
        Price?: string,
        Quantity?: number,
        IsHaveDiscount?: Boolean,
        DiscountAmount?: number,
        DiscountType?: string,
        CategoryID?: number,
        IsDeleted?: Boolean
    ) {
        this.id = Id;
        this.name = Name;
        this.description = Description;
        this.imagePath = ImagePath;
        this.price = Price;
        this.quantity = Quantity;
        this.isHaveDiscount = IsHaveDiscount;
        this.disacountAmount = DiscountAmount;
        this.discountType = DiscountType;
        this.categoryID = CategoryID;
        this.isDeleted = IsDeleted;
    }
}