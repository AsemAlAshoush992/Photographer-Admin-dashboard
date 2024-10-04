export class ConfirmDialog {
    title: string | undefined;
    message: string | undefined;
    constructor(title: string | undefined, message: string | undefined){
        this.title = title,
        this.message = message
    }
}