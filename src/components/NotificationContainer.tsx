import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Notification from './Notification';
import { StyledNotificationContainer } from './StyledComponents/StyledNotificationContainer';
import { NotificationContainerProps } from '../types';

/**
 * the NotificationContainer class component
 *
 * @author zakaria harti
 */
class NotificationContainer extends React.Component<NotificationContainerProps>{

  static defaultProps: NotificationContainerProps = {
    notifications: [],
    position: 'tr',
    transition: {
      classNames: 'react-notifiable',
      enterTimeout: 500,
      leaveTimeout: 500
    }
  }

  render(){
    const {
      notifications,
      transition
    } = this.props;

    return(
      <StyledNotificationContainer>
        <TransitionGroup>
          {notifications.map(notification => (
            <CSSTransition
              key={notification.id}
              classNames="react-notifiable"
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
  }
};

export default NotificationContainer;
