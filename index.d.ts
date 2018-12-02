declare namespace ReactNotifiable {
  export interface INotification{
    id: string | number;
    title?: string;
    message?: string;
    level: 'primary' | 'success' | 'info' | 'warning' | 'error';
    position: ReactNotifiable.notificationPosition | string;
    dismissAfter: number | null;
    dismissible: boolean;
    onMounted?: () => void;
    onUnmounted?: () => void;
    closeButton?: boolean;
    buttons?: {
      id?: any;
      label: string,
      action?: () => void,
      customClass?: string;
    }[];
    allowHTML?: boolean;
    extendStyles?: {
      notificationWrapper: string;
      notificationTitle: string;
      notificationMessage: string;
      notificationButtonsContainer: string;
      notificationButton: string;
    };
  }

  export const enum notificationLevel{
    PRIMARY = 'primary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
  }

  export const enum notificationPosition{
    TOP_RIGHT = 'tr',
    TOP_CENTER = 'tc',
    TOP_LEFT = 'tl',
    BOTTOM_RIGHT = 'br',
    BOTTOM_LEFT = 'bl',
    BOTTOM_CENTER = 'bc'
  }
}
