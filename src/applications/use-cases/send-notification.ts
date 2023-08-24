import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notification-repositories';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    category,
    content,
    recipientId,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    // Persistir essa notification no banco de dados
    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
