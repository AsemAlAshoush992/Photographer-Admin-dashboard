export class PrivateGalleryDetailsDTO {
    id: number | undefined;
    path: string | undefined;
    fileName: string | undefined;
    fileType: string | undefined;
    isPrivate: boolean | undefined;
    orderID: number | undefined;
    isDeleted: boolean | undefined;

    constructor(
        Id?: number,
        Path?: string,
        FileName?: string,
        FileType?: string,
        IsPrivate?: boolean,
        OrderID?: number,
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.path = Path;
        this.fileName = FileName;
        this.fileType = FileType;
        this.isPrivate = IsPrivate;
        this.orderID = OrderID;
        this.isDeleted = IsDeleted;
    }
}