import { IRemoveNotification } from '../store/types';
import { Timer } from '../helpers/misc';
/**
 * Notification props types
 */
export interface NotificationProps{
  notification: ReactNotifiable.INotification;
  closeNotification?: (not: ReactNotifiable.INotification) => IRemoveNotification;
}

/**
 * Notification state types
 */
export interface NotificationState{
  timer: Timer;
}

export interface NotificationContainerProps{
  notifications: ReactNotifiable.INotification[];
  transition ?: {
    classNames ?: string,
    enterTimeout ?: number,
    leaveTimeout ?: number
  };
  position ?: string;
}
