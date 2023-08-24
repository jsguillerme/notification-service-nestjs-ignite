import { makeNotificationFactory } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient Notification', () => {
  it('should be able to countrecipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recepient-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recepient-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recepient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recepient-1',
    });

    expect(count).toEqual(2);
  });
});
