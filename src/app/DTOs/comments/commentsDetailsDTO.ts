export class CommentsDetailsDTO{
    id: number | undefined;
    authorName : string | undefined;
    content : string | undefined;
    commentDate : Date  | undefined;
    isDeleted: Boolean | undefined;
}