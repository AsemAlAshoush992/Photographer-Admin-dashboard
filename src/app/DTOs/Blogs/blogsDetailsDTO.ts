export class BlogsDetailsDTO {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    article: string | undefined;
    blogDate: Date | undefined;
    status: string | undefined;
    authorID: number | undefined;
    isDeleted: boolean | undefined;

    constructor(
        ID?: number, 
        Title?: string, 
        Description?: string, 
        Article?: string, 
        BlogDate?: Date, 
        status?: string, 
        AuthorID?: number, 
        IsDeleted?: boolean
    ) {
        this.id = ID;
        this.title = Title;
        this.description = Description;
        this.article = Article;
        this.blogDate = BlogDate;
        this.status = status;
        this.authorID = AuthorID;
        this.isDeleted = IsDeleted;
    }
}