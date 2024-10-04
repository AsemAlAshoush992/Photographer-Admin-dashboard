export class PrivateGalleryDetailsForClientDTO {
    id: number | undefined;
    path: string | undefined;
    fileName: string | undefined;
    fileType: string | undefined;
    orderID: number | undefined;
    constructor(id?: number, path?: string, fileName?: string, fileType?: string, orderID? :number) {
        this.id = id;
        this.path = path;
        this.fileName = fileName;
        this.fileType = fileType;
        this.orderID = orderID;
      }

}
