import * as React from 'react';
import { NotificationType } from '../../index';
interface NotificationState {
    isOpen: boolean;
}
declare class NotificationComp extends React.Component<NotificationType, NotificationState> {
    state: NotificationState;
    static defaultProps: NotificationType;
    private timeOutDelay;
    private notificationThemes;
    componentDidUpdate(prevProps: NotificationType): void;
    componentWillUnmount(): void;
    private getPosition;
    private getOnDismiss;
    private getOnButtonClickEvent;
    private getTheme;
    private getButtonExtendedStyles;
    close: () => void;
    render(): JSX.Element;
}
export default NotificationComp;
