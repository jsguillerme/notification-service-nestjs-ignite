import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@/applications/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@/applications/use-cases/cancel-notification';
import { CountRecipientNotification } from '@/applications/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@/applications/use-cases/get-recipient-notifications';
import { ReadNotification } from '@/applications/use-cases/read-notification';
import { UnreadNotification } from '@/applications/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
