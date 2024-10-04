export class UpdateOrderDTO {
    Id: number | undefined;
    OrderDate: Date | undefined;
    Title: string | undefined;
    Note: string | undefined;
    Status: string | undefined;
    PaymentMethod: string | undefined;
    UserID: number | undefined;
    ServiceID: number | undefined;
}