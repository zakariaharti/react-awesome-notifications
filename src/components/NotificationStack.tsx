import * as React from 'react';
import styled from 'styled-components';
import StyledTs from 'styled-components-ts';

import Notification from './Notification';
import { NotificationStackType, NotificationType } from '../../index';

interface NotificationStackStateType{
  isOpen: boolean;
  notifications: NotificationType[]
}

const StyledNotificationStack = styled.div`
   display: flex;
   flex-direction: column;
   position: fixed;
   width: 26em;
   overflow: hidden;
   justify-content: center;
   left: 0;
   top: 0;
`;

const StyledExtendedNotificationStack = StyledTs<{extendStyles: string}>(styled(StyledNotificationStack))`
   ${props => props.extendStyles }
`;

class NotificationStack extends React.Component<NotificationStackType,NotificationStackStateType>{

  state: NotificationStackStateType = {
    isOpen: this.props.isOpen,
    notifications: this.props.notifications
  }

  componentDidUpdate(prevProps: NotificationStackType){
    if(prevProps.isOpen !== this.props.isOpen){
      this.setState({
        isOpen: this.props.isOpen,
        notifications: this.props.notifications
      });
    }
  }

  addNotification = (notification: NotificationType) => {
    if(typeof this.state.notifications !== 'undefined' && Array.isArray(this.state.notifications)){
      let not = this.state.notifications.find(not => not.uid == notification.uid);
      if(typeof not !== 'undefined'){
        return;
      }

      this.state.notifications.push(notification);
    }
  }

  removeNotification = (notification: NotificationType) => {
    if(typeof this.state.notifications !== 'undefined' && Array.isArray(this.state.notifications)){
      let not = this.state.notifications.find(not => not.uid == notification.uid);
      if(typeof not === 'undefined'){
        return;
      }

      this.state.notifications.filter(not => not.uid != notification.uid);
    }
  }

  closeNotifications = () => this.setState({ isOpen: false });

  render(){
    return(
      <StyledExtendedNotificationStack extendStyles={this.props.extendStyles || ''}>
        {this.props.notifications.map(notification => (
          <Notification
            key={notification.uid}
            isOpen={this.state.isOpen}
            dismissDelay={null}
            extendContainerStyles={`
              position: unset;
            `}
            {...notification}
          />
        ))}
      </StyledExtendedNotificationStack>
    );
  }
}

export default NotificationStack;
