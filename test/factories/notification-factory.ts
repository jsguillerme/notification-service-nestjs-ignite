import { Content } from '../../src/applications/entities/content';
import {
  Notification,
  NotificationProps,
} from '../../src/applications/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotificationFactory(override: Override = {}): Notification {
  return new Notification({
    category: 'social marketing',
    content: new Content('this is a notification'),
    recipientId: 'example-recepient-1',
    ...override,
  });
}
