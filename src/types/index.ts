import { IRemoveNotification } from '../store/types';
import { Timer } from '../helpers/misc';
/**
 * Notification props types
 */
export interface NotificationProps{
  notification: ReactNotifiable.INotification;
  closeNotification?: (id: any) => IRemoveNotification;
}

/**
 * Notification state types
 */
export interface NotificationState{
  timer: Timer;
}

export interface NotificationContainerProps{
  notifications: ReactNotifiable.INotification[];
  position ?: string;
}
