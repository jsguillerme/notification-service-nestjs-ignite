import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
