import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const uuid = require('uuid/v1');

import {
  ExtendedStyledButton,
  ExtendedStyledButtonsContainer,
  ExtendedStyledMessage,
  ExtendedStyledNotification,
  ExtendedStyledTitle,
  GlobalStyles,
  StyledNotificationSystem
} from '../components/StyledComponents';
import { NotificationContainerProps } from '../types';
import { Notification } from '../components/Notification';
import NotificationContainer from '../components/NotificationContainer';
import { NotificationProps } from '../types';
import { StyledNotificationContainer } from '../components/StyledComponents';

export class ExpectedNotification extends React.Component<NotificationProps>{

  private  setHTML = (content: string) => {
    return {
      __html: content
    };
  };

  private renderButtons = () => {
    const { buttons } = this.props.notification;
    return buttons.map(button => {
      return(
        <ExtendedStyledButton
          key={uuid()}
          onClick={() => {
            if(button.action && typeof button.action === 'function'){
              return button.action();
            }
            return null;
          }}
          level={this.props.notification.level}
        >
          <span className="btn-text">{button.label}</span>
        </ExtendedStyledButton>
      )
    });
  }

  render(){

    const {
      allowHTML,
      buttons,
      closeButton,
      dismissible,
      message,
      title,
      level
    } = this.props.notification;

    return(
      <ExtendedStyledNotification
        className={`notification-wrapper`}
        dismissible={dismissible}
        level={level}
      >
        <div className='container'>
          <div className="notification-content">
            {
              title
                ?
                allowHTML
                  ?
                  <ExtendedStyledTitle
                    level={level}
                    dangerouslySetInnerHTML={this.setHTML(title)}
                  >
                  </ExtendedStyledTitle>
                  :
                  <ExtendedStyledTitle
                    level={level}
                  >
                    {title}
                  </ExtendedStyledTitle>
                :
                null
            }
            {
              message
                ?
                allowHTML
                  ?
                  <ExtendedStyledMessage
                    level={level}
                    dangerouslySetInnerHTML={this.setHTML(message)}
                  >
                  </ExtendedStyledMessage>
                  :
                  <ExtendedStyledMessage
                    level={level}
                  >
                      {message}
                  </ExtendedStyledMessage>
                :
                null
            }
          </div>
          {
            dismissible && closeButton
            ? (
              <div className={`notification-close-btn`}>
                <span className="close-btn" onClick={null}>&times;</span>
              </div>
            ) :
            null
          }
          {buttons && buttons.length
            ? (
              <ExtendedStyledButtonsContainer>
                {this.renderButtons()}
              </ExtendedStyledButtonsContainer>
            )
            :
            null
          }
        </div>
      </ExtendedStyledNotification>
    )
  }
}

export class ExpectedNotificationContainer extends React.Component<NotificationContainerProps>{

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
}


export class ExpectedNotificationSystem extends React.Component<{
  notifications: ReactNotifiable.INotification[];
}> {

  static defaultProps: Partial<NotificationContainerProps> = {
    notifications: []
  }

  /**
   * render Notification Containers
   *

   * @returns {ReactElement}
   * @private
   */
  private renderNotificationContainers = () => {
    const containers = [];
    const positions = ['tr','tc','tl','br','bc','bl'];

    let notifications = this.props.notifications;

    containers.push(positions.map(position => {
      const notifs = notifications.filter(not => {
        return not.position == position;
      });

      return(
        <NotificationContainer
          key={position}
          position={position}
          notifications={notifs}
        />
      )
    }));
    return containers;
  }

  render(){
    return(
      <StyledNotificationSystem>
        <GlobalStyles />
        {this.renderNotificationContainers()}
      </StyledNotificationSystem>
    )
  }
}
