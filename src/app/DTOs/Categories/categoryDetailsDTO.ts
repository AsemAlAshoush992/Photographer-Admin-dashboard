export class CategoryDetailsDTO {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    imagePath: string | undefined;
    isDeleted: boolean | undefined;

    constructor(
        Id?: number, 
        Title?: string, 
        Description?: string, 
        ImagePath?: string, 
        IsDeleted?: boolean
    ) {
        this.id = Id;
        this.title = Title;
        this.description = Description;
        this.imagePath = ImagePath;
        this.isDeleted = IsDeleted;
    }
}