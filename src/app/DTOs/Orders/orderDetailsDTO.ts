export class OrderDetailsDTO {
    id: number | undefined;
    orderDate: Date | undefined;
    title: string | undefined;
    note: string | undefined;
    status: string | undefined;
    paymentMethod: string | undefined;
    userID: number | undefined;
    serviceID: number | undefined;
    isDeleted: boolean | undefined;

    constructor(
        Id?: number,
        OrderDate?: Date,
        Title?: string,
        Note?: string,
        Status?: string,
        PaymentMethod?: string,
        UserID?: number,
        ServiceID?: number,
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.orderDate = OrderDate;
        this.title = Title;
        this.note = Note;
        this.status = Status;
        this.paymentMethod = PaymentMethod;
        this.userID = UserID;
        this.serviceID = ServiceID;
        this.isDeleted = IsDeleted;
    }
}