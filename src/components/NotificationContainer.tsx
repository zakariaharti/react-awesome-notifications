import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Notification from './Notification';
import { StyledNotificationContainer } from './StyledComponents';
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
    animationClassNames: 'notification-wrapper'
  }

  render(){
    const { notifications } = this.props;

    return(
      <StyledNotificationContainer position={this.props.position}>
        <TransitionGroup>
          {notifications.map(notification => (
            <CSSTransition
              key={notification.id}
              classNames={this.props.animationClassNames}
              timeout={500}
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
