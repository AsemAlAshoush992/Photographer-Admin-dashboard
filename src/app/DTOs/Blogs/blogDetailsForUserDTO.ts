import { CommentDTO } from "../comments/commentDTO";
import { BlogAttachementDTO } from "./blogAttachementDTO";

export class BlogDetailsForUserDTO {
    id: number | undefined;
    title: string | undefined;
    article: string | undefined;
    blogDate: Date | undefined;
    authorName: string | undefined;
    status: string | undefined;
    blogAttachments: BlogAttachementDTO[] | undefined;
    comments: CommentDTO[] | undefined;
}