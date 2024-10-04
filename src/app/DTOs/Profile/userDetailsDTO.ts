export class UserDetailsDTO {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    birthDate: Date | undefined;
    imagePath: string | undefined;
    phone: string | undefined;
    userType: string | undefined;
    isDeleted: boolean | undefined;
    constructor(
        Id?: number,
        FirstName?: string,
        LastName?: string,
        Email?: string,
        BirthDate?: Date,
        ImagePath?: string,
        Phone?: string,
        UserType?: string,
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.email = Email;
        this.birthDate = BirthDate;
        this.imagePath = ImagePath;
        this.phone = Phone;
        this.userType = UserType;
        this.isDeleted = IsDeleted;
    }
}