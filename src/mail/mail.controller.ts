import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('')
  sendTest(@Body() user: {to: string, username: string, title: string}) {
    return this.mailService.sendEmail(user, 'igor');
  }
}
