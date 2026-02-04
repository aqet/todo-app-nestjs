import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

//pour envoyer lle mail depuis un formulair portfio par exemple
// await this.mailService.sendMail({
//   to: 'contact@tonportfolio.com', // TOI
//   subject: 'Nouveau message depuis le portfolio',
//   template: 'contact',
//   replyTo: 'jean.dupont@gmail.com', // LUI
//   context: {
//     name: 'Jean Dupont',
//     email: 'jean.dupont@gmail.com',
//     message: 'Salut, j’aime beaucoup ton portfolio !',
//   },
// });



@Injectable()
export class MailService {
  teamplateUrl: string = '';

  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {
    this.initializeTransporter();
    this.teamplateUrl = join(process.cwd(), 'src', 'mail', 'templates');
  }
  private readonly logger = new Logger(MailService.name);

  private transporter: nodemailer.Transporter;

  private initializeTransporter() {
    // Check if SMTP configuration is provided
    // const smtpHost = this.configService.get<string>('SMTP_HOST');
    // const smtpUser = this.configService.get<string>('SMTP_USER');
    // const smtpPass = this.configService.get<string>('SMTP_PASS');
    const smtpHost = 'smtp.gmail.com';
    const smtpUser = 'ymeet072@gmail.com';
    const smtpPass = 'evld prgy azze qatw';

    // SMTP configuration validation
    this.logger.log('Initializing email service...');

    if (!smtpHost || !smtpUser || !smtpPass) {
      this.logger.warn(
        'SMTP configuration not provided. Email notifications will be disabled.',
      );
      this.logger.warn(
        'To enable email notifications, please configure SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.',
      );
      return;
    }

    // const smtpPort = this.configService.get<number>('SMTP_PORT', 587);
    const smtpPort = 465;
    // const smtpSecure = this.configService.get<boolean>('SMTP_SECURE', false);
    const smtpSecure = true;

    const smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: {
        // user: 'ymeet072@gmail.com',
        // pass: 'evld prgy azze qatw',
        user: 'tientcheuigorcarel@gmail.com',
        pass: 'hqez izyx jkjg iroq',
      },
      // Different TLS config based on port
      ...(smtpPort === 465
        ? {
            // For SSL port 465
            tls: {
              rejectUnauthorized: false,
              servername: 'smtp.gmail.com',
            },
          }
        : {
            // For STARTTLS port 587
            requireTLS: true,
            tls: {
              rejectUnauthorized: false,
              ciphers: 'SSLv3',
            },
          }),
    };

    this.logger.log(` SMTP transporter initialized (${smtpHost}:${smtpPort})`);

    this.transporter = nodemailer.createTransport(smtpConfig);

    // Test the connection with a simple approach
    this.logger.log('SMTP transporter initialized. Testing connection...');

    // Try to verify connection with timeout
    const verifyWithTimeout = () => {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          this.logger.warn(
            'SMTP verification timed out. Emails will be sent without verification.',
          );
          resolve(false);
        }, 10000); // 10 second timeout

        this.transporter.verify((error) => {
          clearTimeout(timeout);
          if (error) {
            this.logger.warn(`SMTP verification failed: ${error.message}`);
            this.logger.warn(
              'Emails will still be attempted. This might be a temporary network issue.',
            );
            resolve(false);
          } else {
            this.logger.log(' SMTP server connection verified successfully');
            resolve(true);
          }
        });
      });
    };

    // Run verification in background
    setTimeout(
      () => {
        verifyWithTimeout();
      },
      5 * 60 * 60 * 1000,
    ); // Wait 2 seconds before verifying
  }

  async sendEmail(
    user: {
      to: string;
      username: string;
      title?: string;
      last?: string;
      next?: string;
    },
    templateName: string,
  ) {
    templateName = templateName + '.hbs';
    const templatePath = join(this.teamplateUrl, templateName);
    const templateConvertUrl = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateConvertUrl);
    const context = {
      username: user.username,
      taskTitle: user.title,
      last: user.last,
      next: user.next,
      // taskDescription: task.description,
    };
    try {
      const mailOptions = {
        from: `"Todo-App" <this.configService.get<string>('SMTP_FROM_EMAIL')>`,
        to: user.to,
        subject: `Ticket Created:`,
        html: template(context),
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Ticket creation notification sent to creator: ${user.username}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send ticket creation notification to creator: ${error.message}`,
      );
      return false;
    }
  }
  async sendTestEmail(user: { to: string; username: string; title: string }) {
    if (!this.transporter) {
      this.logger.warn(
        'SMTP not configured. Skipping ticket creation notification email.',
      );
      return false;
    }

    try {
      const mailOptions = {
        from: `"Todo-App" <this.configService.get<string>('SMTP_FROM_EMAIL')}>`,
        to: user.to,
        subject: `Ticket Created:`,
        html: this.generateTicketCreationEmailForCreator(
          user.username,
          user.title,
        ),
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Ticket creation notification sent to creator: ${user.username}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send ticket creation notification to creator: ${error.message}`,
      );
      return false;
    }
    // return await this.mailerService.sendMail({
    //   from: '"mon app Todo-list" <contact@digikuntz.com>',
    //   to: user.to,
    //   subject: 'envoie de mail avec nestjs et nodemailer',
    //   // text: "c'est bon mon pote",
    //   template: 'task-created.hbs',
    //   context: {
    //     username: user.username,
    //     taskTitle: user.title,
    //     // taskDescription: task.description,
    //   },
    //   // html: this.generateTicketCreationEmailForCreator(user.username,  user.title)
    // });
  }

  private generateTicketCreationEmailForCreator(
    username: string,
    taskTitle: string,
  ): string {
    // const ticketUrl = `${this.configService.get<string>('FRONTEND_URL')}/tickets/${ticket._id}`;

    return `
        <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Tâche créée</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      h1 {
        color: #2f80ed;
        font-size: 22px;
        margin-bottom: 20px;
      }

      p {
        color: #333;
        line-height: 1.6;
        font-size: 15px;
      }

      .task-box {
        background: #f0f4ff;
        border-left: 4px solid #2f80ed;
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
      }

      .task-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 8px;
      }

      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1> Tâche créée avec succès</h1>

      <p>Bonjour <strong>${username}</strong>,</p>

      <p>
        Ta nouvelle tâche a bien été ajoutée à ta liste.
        Voici les détails :
      </p>

      <div class="task-box">
        <div class="task-title">${taskTitle}</div>
        
      </div>

      <p>
        Tu peux maintenant la deplacer
        directement depuis ton application.
      </p>

      <p>Bon courage et bonne organisation </p>

      <div class="footer">
        <p>
          Cet email a été envoyé automatiquement par <strong>Todo App</strong>.
          <br />
          Merci de ne pas y répondre.
        </p>
      </div>
    </div>
  </body>
</html>

      `;
  }
}
