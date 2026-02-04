import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private configService;
    teamplateUrl: string;
    constructor(mailerService: MailerService, configService: ConfigService);
    private readonly logger;
    private transporter;
    private initializeTransporter;
    sendEmail(user: {
        to: string;
        username: string;
        title?: string;
        last?: string;
        next?: string;
    }, templateName: string): Promise<boolean>;
    sendTestEmail(user: {
        to: string;
        username: string;
        title: string;
    }): Promise<boolean>;
    private generateTicketCreationEmailForCreator;
}
