import { makeNotificationFactory } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get Recipients Notifications', () => {
  it('should be able to getrecipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-recipient-2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'example-recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-1' }),
        expect.objectContaining({ recipientId: 'example-recipient-1' }),
      ]),
    );
  });
});
