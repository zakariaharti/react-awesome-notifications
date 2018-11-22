declare namespace ReactNotifiable {
  export interface INotification{
    id: string;
    title?: string;
    message?: string;
    level: 'primary' | 'success' | 'info' | 'warning' | 'error';
    position: ReactNotifiable.notificationPosition;
    dismissAfter: number | null;
    dismissible: boolean;
    onMounted?: () => void;
    onUnmounted?: () => void;
    closeButton?: boolean;
    buttons?: {
      label: string,
      action: (notification: Notification) => void,
    }[];
    allowHTML?: boolean;
  }

  export const enum notificationLevel{
    PRIMARY = 'primary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
  }

  export const enum notificationPosition{
    TOP_RIGHT = 't',
    TOP_CENTER = 'tc',
    TOP_LEFT = 'tl',
    BOTTOM_RIGHT = 'br',
    BOTTOM_LEFT = 'bl',
    BOTTOM_CENTER = 'bc'
  }
}
