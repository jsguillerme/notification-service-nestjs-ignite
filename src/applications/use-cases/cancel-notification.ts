import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found-error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
