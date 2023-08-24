import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty({ message: 'Recipient ID is required' })
  @IsUUID('all', { message: 'Recipient ID must be a valid UUID' })
  recipientId: string;

  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsNotEmpty({ message: 'Content is required' })
  @Length(5, 240, { message: 'Content must be between 1 and 50 characters' })
  content: string;
}
