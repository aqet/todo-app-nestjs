"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const path_1 = require("path");
const fs = __importStar(require("fs"));
const handlebars = __importStar(require("handlebars"));
let MailService = MailService_1 = class MailService {
    mailerService;
    configService;
    teamplateUrl = '';
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
        this.initializeTransporter();
        this.teamplateUrl = (0, path_1.join)(process.cwd(), 'src', 'mail', 'templates');
    }
    logger = new common_1.Logger(MailService_1.name);
    transporter;
    initializeTransporter() {
        const smtpHost = 'smtp.gmail.com';
        const smtpUser = 'ymeet072@gmail.com';
        const smtpPass = 'evld prgy azze qatw';
        this.logger.log('Initializing email service...');
        if (!smtpHost || !smtpUser || !smtpPass) {
            this.logger.warn('SMTP configuration not provided. Email notifications will be disabled.');
            this.logger.warn('To enable email notifications, please configure SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
            return;
        }
        const smtpPort = 465;
        const smtpSecure = true;
        const smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'tientcheuigorcarel@gmail.com',
                pass: 'hqez izyx jkjg iroq',
            },
            ...(smtpPort === 465
                ? {
                    tls: {
                        rejectUnauthorized: false,
                        servername: 'smtp.gmail.com',
                    },
                }
                : {
                    requireTLS: true,
                    tls: {
                        rejectUnauthorized: false,
                        ciphers: 'SSLv3',
                    },
                }),
        };
        this.logger.log(` SMTP transporter initialized (${smtpHost}:${smtpPort})`);
        this.transporter = nodemailer.createTransport(smtpConfig);
        this.logger.log('SMTP transporter initialized. Testing connection...');
        const verifyWithTimeout = () => {
            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    this.logger.warn('SMTP verification timed out. Emails will be sent without verification.');
                    resolve(false);
                }, 10000);
                this.transporter.verify((error) => {
                    clearTimeout(timeout);
                    if (error) {
                        this.logger.warn(`SMTP verification failed: ${error.message}`);
                        this.logger.warn('Emails will still be attempted. This might be a temporary network issue.');
                        resolve(false);
                    }
                    else {
                        this.logger.log(' SMTP server connection verified successfully');
                        resolve(true);
                    }
                });
            });
        };
        setTimeout(() => {
            verifyWithTimeout();
        }, 5 * 60 * 60 * 1000);
    }
    async sendEmail(user, templateName) {
        templateName = templateName + '.hbs';
        const templatePath = (0, path_1.join)(this.teamplateUrl, templateName);
        const templateConvertUrl = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateConvertUrl);
        const context = {
            username: user.username,
            taskTitle: user.title,
            last: user.last,
            next: user.next,
        };
        try {
            const mailOptions = {
                from: `"Todo-App" <this.configService.get<string>('SMTP_FROM_EMAIL')>`,
                to: user.to,
                subject: `Ticket Created:`,
                html: template(context),
            };
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Ticket creation notification sent to creator: ${user.username}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send ticket creation notification to creator: ${error.message}`);
            return false;
        }
    }
    async sendTestEmail(user) {
        if (!this.transporter) {
            this.logger.warn('SMTP not configured. Skipping ticket creation notification email.');
            return false;
        }
        try {
            const mailOptions = {
                from: `"Todo-App" <this.configService.get<string>('SMTP_FROM_EMAIL')}>`,
                to: user.to,
                subject: `Ticket Created:`,
                html: this.generateTicketCreationEmailForCreator(user.username, user.title),
            };
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Ticket creation notification sent to creator: ${user.username}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send ticket creation notification to creator: ${error.message}`);
            return false;
        }
    }
    generateTicketCreationEmailForCreator(username, taskTitle) {
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
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map