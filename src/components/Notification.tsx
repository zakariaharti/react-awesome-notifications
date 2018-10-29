import * as React from 'react';
import styled from 'styled-components';

import { NotificationType } from '../../index';

const StyledNotificationWrapper = styled.div``;

const StyledNotificationContainer = styled.div``;

const StyledNotificationHeader = styled.div``;

const StyledNotificationBody = styled.div``;

const StyledNotificationFooter = styled.div``;

const NotificationTitle: React.SFC<NotificationType> = (props) => {
  if(!props.title){
    return null;
  }

  return <h5 className="notification-title">{props.title}</h5>
}

const NotificationCloseIcon: React.SFC<NotificationType> = (props) => {
  if(!props.showCloseIcon){
    return null;
  }

  return(
    <div>
      <button>
        <span>&times;</span>
      </button>
    </div>
  )
}

const NotificationButton: React.SFC<NotificationType> = (props) => {
  if(!props.button){
    return null;
  }

  return(
    <button onClick={props.button.onClickEvent}>{props.button.label}</button>
  )
}

const Notification: React.SFC<NotificationType> = (props) => {
  return(
    <StyledNotificationWrapper>
      <StyledNotificationContainer>
        <StyledNotificationHeader>
          <NotificationTitle {...props} />
          <NotificationCloseIcon {...props} />
        </StyledNotificationHeader>
        <StyledNotificationBody>
          <p className="notification-body">{!props.body ? '' : props.body}</p>
        </StyledNotificationBody>
        <StyledNotificationFooter>
          <NotificationButton {...props} />
        </StyledNotificationFooter>
      </StyledNotificationContainer>
    </StyledNotificationWrapper>
  )
};

export default Notification;
