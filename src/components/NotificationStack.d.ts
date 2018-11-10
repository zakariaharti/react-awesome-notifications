import * as React from 'react';
import { NotificationStackType, NotificationType } from '../../index';
interface NotificationStackStateType {
    isOpen: boolean;
    notifications: NotificationType[];
}
declare class NotificationStack extends React.Component<NotificationStackType, NotificationStackStateType> {
    state: NotificationStackStateType;
    componentDidUpdate(prevProps: NotificationStackType): void;
    addNotification: (notification: NotificationType) => void;
    removeNotification: (notification: NotificationType) => void;
    closeNotifications: () => void;
    render(): JSX.Element;
}
export default NotificationStack;
