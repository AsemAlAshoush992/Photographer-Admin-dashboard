export class ProblemDetailsDTO {
    id: number | undefined;
    title: string | undefined;
    purpose: string | undefined;
    description: string | undefined;
    userID: number | undefined;
    orderID: number | undefined;
    isDeleted: boolean | undefined;

    constructor(
        Id?: number,
        Title?: string,
        Purpose?: string,
        Description?: string,
        UserID?: number,
        OrderID?: number,
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.title = Title;
        this.purpose = Purpose;
        this.description = Description;
        this.userID = UserID;
        this.orderID = OrderID;
        this.isDeleted = IsDeleted;
    }
}