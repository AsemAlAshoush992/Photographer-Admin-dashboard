export class ContactRequestDetailsDTO {
    id: number | undefined;
    clientName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    description: string | undefined;
    purpose: string | undefined;
    budget: number | undefined;
    userID: number | undefined;
    isDeleted: boolean | undefined;

    constructor(
        Id?: number,
        ClientName?: string,
        Email?: string,
        Phone?: string,
        Description?: string,
        Purpose?: string,
        Budget?: number,
        UserID?: number,
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.clientName = ClientName;
        this.email = Email;
        this.phone = Phone;
        this.description = Description;
        this.purpose = Purpose;
        this.budget = Budget;
        this.userID = UserID;
        this.isDeleted = IsDeleted;
    }
}