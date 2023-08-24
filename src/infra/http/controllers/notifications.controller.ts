import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/applications/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@/applications/use-cases/cancel-notification';
import { ReadNotification } from '@/applications/use-cases/read-notification';
import { UnreadNotification } from '@/applications/use-cases/unread-notification';
import { CountRecipientNotification } from '@/applications/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@/applications/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Post()
  async create(@Body() data: CreateNotificationBody) {
    const { recipientId, category, content } = data;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
