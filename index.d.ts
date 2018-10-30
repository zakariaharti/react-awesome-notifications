import { ReactElement, SyntheticEvent } from 'react';


export interface NotificationType{
  isOpen: boolean;
  level?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  title?: string;
  body?: string | ReactElement<any>;
  position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
  dismissDelay?: number;
  onDismiss?: (not?: any) => void;
  duration: number;
  button: {
    label: string;
    onClickEvent?: (e?: SyntheticEvent<HTMLButtonElement>) => void;
    styles?: string;
  } | null;
  showCloseIcon?: boolean;
  uid: string;
  dismissisble?: 'both' | 'closeIcon' | 'html';
  onAdd?: (notification?: NotificationType) => void;
  onRemove?: (notification?: NotificationType) => void;
  styles?: {
    container: string;
    title: string;
    body: string;
  }
}

export interface NotificationStackType{
  isOpen: boolean;
  notifications: NotificationType[];
  addNotification?: (not: NotificationType) => void;
  removeNotification?: (not: NotificationType) => void;
  closeNotifications?: (not: NotificationType) => void;
}
