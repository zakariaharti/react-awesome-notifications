import * as React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

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

interface NotificationState{
  isOpen: boolean;
}


class Notification extends React.Component<NotificationType,NotificationState>{

  state: NotificationState = {
    isOpen: this.props.isOpen
  }

  static defaultProps: NotificationType = {
    isOpen: false,
    body: '',
    dismissDelay: 1000,
    dismissisble: 'both',
    duration: 0,
    level: 'primary',
    button: null,
    position: 'tr',
    showCloseIcon: true,
    uid: ''
  }

  timeOutDelay: any;

  componentDidMount(){
    /*if(this.props.isOpen && this.props.dismissDelay){
      if(this.props.onDismiss){
        this.timeOutDelay = setTimeout(
          () => {
            this.setState({ isOpen: false });
            this.props.onDismiss();
          },
          this.props.dismissDelay
        );
      }else{
        this.timeOutDelay = setTimeout(
          () => {
            this.setState({ isOpen: false });
          },
          this.props.dismissDelay
        );
      }
    }*/
  }

  componentWillUnmount(){
    //clearTimeout(this.timeOutDelay);
  }

  render(){
    return(
      <StyledNotificationWrapper>
        <CSSTransition
          in={this.props.isOpen}
          classNames="notification"
          timeout={this.props.duration}
          unmountOnExit
        >
          {state => (
            <StyledNotificationContainer>
              <StyledNotificationHeader>
                <NotificationTitle {...this.props} />
                <NotificationCloseIcon {...this.props} />
              </StyledNotificationHeader>
              <StyledNotificationBody>
                <p className="notification-body">{!this.props.body ? '' : this.props.body}</p>
              </StyledNotificationBody>
              <StyledNotificationFooter>
                <NotificationButton {...this.props} />
              </StyledNotificationFooter>
            </StyledNotificationContainer>
          )}
        </CSSTransition>
      </StyledNotificationWrapper>
    )
  }
};

export default Notification;
