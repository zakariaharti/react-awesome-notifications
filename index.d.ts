import { ReactElement, SyntheticEvent } from 'react';

/**
 * @interface NotificationType the base types of the Notification component
 */

interface NotificationType{
  isOpen: boolean;
  level?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  title?: string;
  body?: string | ReactElement<any>;
  position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
  dismissDelay?: number;
  duration: number;
  button?: {
    label: string;
    onClickEvent: (e: SyntheticEvent<HTMLButtonElement>) => void;
    styles: string;
  } | {
    label: string;
    onClickEvent: (e: SyntheticEvent<HTMLButtonElement>) => void;
    styles: string;
  }[];
  showCloseIcon?: boolean;
  uid: string;
  dismissisble?: 'both' | 'closeIcon' | 'html';
  onAdd?: (notification: NotificationType) => void;
  onRemove?: (notification: NotificationType) => void;
  styles?: {
    container: string;
    title: string;
    body: string;
  }
}

/**
 * @interface AwesomeNotificationType the base types of the Notification AwesomeNotification component
 */

interface AwesomeNotificationType{
  isOpen: boolean;
  notifications: NotificationType[];
  addNotification?: (not: NotificationType) => void;
  removeNotification?: (not: NotificationType) => void;
  closeNotificatiobs?: (not: NotificationType) => void;
}
