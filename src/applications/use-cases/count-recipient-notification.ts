import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repositories';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId);

    return {
      count,
    };
  }
}
