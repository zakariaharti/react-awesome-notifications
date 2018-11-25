import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Notification from './Notification';
import { StyledNotificationContainer } from './StyledComponents/StyledNotificationContainer';

interface NotificationContainerProps{
  notifications: ReactNotifiable.INotification[];
  transition ?: {
    classNames ?: string,
    enterTimeout ?: number,
    leaveTimeout ?: number
  };
  position ?: string;
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
    <StyledNotificationContainer>
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
    </StyledNotificationContainer>
  )
};

export default NotificationContainer;
