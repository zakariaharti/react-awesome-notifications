import { ReactElement, SyntheticEvent, StatelessComponent, Component  } from 'react';


export interface NotificationType{
  isOpen: boolean;
  level?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  title?: string;
  body?: string;
  position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
  dismissDelay?: number | null;
  onDismiss?(): void;
  duration: number;
  button?: {
    label: string;
    onClickEvent?: (e?: any) => void;
    styles?: string;
  } | null;
  showCloseIcon?: boolean;
  uid: string;
  extendContainerStyles?: string;
  extendTitleStyles?: string;
  extendBodyStyles?: string;
  enableAnimation?: boolean;
  animationClassNames?: string;
}

export interface NotificationStackType{
  isOpen: boolean;
  notifications: NotificationType[];
  addNotification?: (not: NotificationType) => void;
  removeNotification?: (not: NotificationType) => void;
  closeNotifications?: (not: NotificationType) => void;
}
