export class ApplicationError {

    constructor(message: string, cause: any) {
        this.message = message;
        this.cause = cause;
    }

    message: string;
    cause: any;

}
