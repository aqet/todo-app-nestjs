import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', //service spmt
        port: 465, //port
        secure: true,
        auth: {
          // user: 'ymeet072@gmail.com', //user mail
          user: 'tientcheuigorcarel@gmail.com', //user mail
          // pass: 'evld prgy azze qatw', //pass app
          pass: 'hqez izyx jkjg iroq', //pass app
        },
        template: {
          dir: join(process.cwd(), 'src', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }, 
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
