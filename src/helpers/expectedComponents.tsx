import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { StyledNotification } from '../components/StyledComponents/StyledNotification';
import { NotificationContainerProps } from '../types';
import { Notification } from '../components/Notification';
import NotificationContainer from '../components/NotificationContainer';
import { NotificationProps } from '../types';

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
        <button
          key={button.label}
          onClick={() => button.action()}
          className="react-notifiable-action-btn"
        >
          <span>{button.label}</span>
        </button>
      )
    })
  }

  render(){

    const {
      allowHTML,
      buttons,
      closeButton,
      dismissible,
      message,
      title
    } = this.props.notification;

    return(
      <StyledNotification
        className="wrapper"
        onClick={dismissible && !closeButton ? () => '' : null}
      >
        <div className="container">
          <div className="not-content">
            {
              title
                ?
                allowHTML
                  ? <h4 dangerouslySetInnerHTML={this.setHTML(title)}></h4>
                  : <h4>{title}</h4>
                :
                null
            }
            {
              message
                ?
                allowHTML
                  ? <h4 dangerouslySetInnerHTML={this.setHTML(message)}></h4>
                  : <h4>{message}</h4>
                :
                null
            }
          </div>
          {
            dismissible && closeButton
            ? (
              <div className="react-notifiable-close-btn">
                <span onClick={() => ''}/>
              </div>
            ) :
            null
          }
          {buttons.length
            ? (
              <div onClick={() => ''}>
                {this.renderButtons()}
              </div>
            )
            :
            null
          }
        </div>
      </StyledNotification>
    )
  }
}

export class ExpectedNotificationContainer extends React.Component<NotificationContainerProps>{

  render(){
    const {
      notifications,
      transition
    } = this.props;

    return(
      <div>
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
      <div>
        {this.renderNotificationContainers()}
      </div>
    )
  }
}
