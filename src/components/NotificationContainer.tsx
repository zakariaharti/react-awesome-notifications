import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Notification from './Notification';

interface NotificationContainerProps{
  notifications: ReactNotifiable.INotification[];
  transition ?: {
    classNames ?: string,
    enterTimeout ?: number,
    leaveTimeout ?: number
  };
  position ?: ReactNotifiable.notificationPosition;
}

/**
 * the NotificationContainer class component
 *
 * @author zakaria harti
 */
const NotificationContainer: React.SFC<NotificationContainerProps> = (props) => {
  const {
    notifications,
    transition
  } = props;

  return(
    <div className="main">
      <TransitionGroup>
        {notifications.map(notification => (
          <CSSTransition
            key={notification.id}
            classNames={transition.classNames || 'react-notifiable'}
            timeout={{
              enter: transition.enterTimeout,
              exit: transition.leaveTimeout
            }}
          >
            <Notification
              notification={notification}
              key={notification.id}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
};

export default NotificationContainer;
