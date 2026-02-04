import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendTest(user: {
        to: string;
        username: string;
        title: string;
    }): Promise<boolean>;
}
